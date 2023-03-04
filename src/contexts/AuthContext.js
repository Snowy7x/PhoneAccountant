import axios from "axios";
import { decodeBase64 } from "bcryptjs";
import React, { useContext, useState, useEffect } from "react";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const [products, setProducts] = useState([]);
  const [members, setMembers] = useState([]);
  const [soldItems, setSoldItems] = useState([]);

  useEffect(() => {
    if (currentUser) {
      // TODO: load the user
      refreshProducts();
      refreshSoldItems();
    } else {
    }
  }, [currentUser]);

  function signup(email, password, username) {
    // TODO: sign up
  }

  async function login(email, password) {
    // TODO: log in
    const res = await axios.post("https://phone-acc.netlify.app/api/login", {
      email: email,
      password: password,
    });

    switch (res.status) {
      case 200:
        console.log("Success: ", res.status);
        setCurrentUser(res.data);
        localStorage.setItem("currentUser", JSON.stringify(res.data));
        return {
          code: 200,
          message: "Logged in successfully",
          user: res.data,
        };
        break;
      case 404:
        return {
          code: 404,
          message: "Email {email} does not exist",
          user: null,
        };
        break;
      case 403:
        return {
          code: 403,
          message: "Wrong password",
          user: null,
        };
        break;
      case 422:
      default:
        return {
          code: 422,
          message: "Unexpected error happened, please try again",
          user: null,
        };
    }
  }

  function logout() {
    // TODO: log out
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  }

  function resetPassword(email) {
    // TODO: Reset password
  }

  function changeEmail(email) {
    // TODO: Change email
  }

  function changePassword(password) {
    // TODO: Change password
  }

  async function addProduct(product) {
    const res = await axios.post(
      "https://phone-acc.netlify.app/api/manageProducts",
      {
        ...product,
        operation: "add",
        email: currentUser.email,
      }
    );

    switch (res.status) {
      case 200:
        refreshProducts();
        return {
          code: 200,
          product: res.data,
          message: "Product added successfully",
        };
        break;
      case 204:
        return {
          code: 204,
          product: null,
          message: "Option still in development",
        };
        break;

      case 401:
        return {
          code: 401,
          product: null,
          message: "Unauthorized Action",
        };
        break;
      case 400:
      case 401:
      default:
        return {
          code: 400,
          product: null,
          message: "Something went wrong, please try again",
        };
        break;
    }
  }

  async function editProduct(product, newProduct) {
    const res = await axios.post(
      "https://phone-acc.netlify.app/api/manageProducts",
      {
        oldProduct: product,
        newProduct: newProduct,
        operation: "edit",
        adminEmail: currentUser.email,
      }
    );

    switch (res.status) {
      case 200:
        refreshProducts();
        return {
          code: 200,
          member: res.data,
          message: "Product updated successfully",
        };
        break;
      case 204:
        return {
          code: 204,
          member: null,
          message: "Option still in development",
        };
        break;

      case 401:
        return {
          code: 401,
          member: null,
          message: "Unauthorized Action",
        };
        break;
      case 500:
        return {
          code: 500,
          member: null,
          message: "[Server Error]: " + res.data,
        };
        break;
      case 400:
      case 401:
      case 404:
      default:
        return {
          code: 400,
          member: null,
          message: "Something went wrong, please try again",
        };
        break;
    }
  }

  async function deleteProduct(product) {
    const res = await axios.post(
      "https://phone-acc.netlify.app/api/manageProducts",
      {
        productId: product._id,
        operation: "delete",
        adminEmail: currentUser.email,
      }
    );
    refreshProducts();
  }

  async function addMember(member) {
    const res = await axios.post(
      "https://phone-acc.netlify.app/api/manageUsers",
      {
        ...member,
        operation: "add",
        adminEmail: currentUser.email,
      }
    );

    switch (res.status) {
      case 200:
        refreshMembers();
        return {
          code: 200,
          member: res.data,
          message: "Member added successfully",
        };
        break;
      case 204:
        return {
          code: 204,
          member: null,
          message: "Option still in development",
        };
        break;

      case 401:
        return {
          code: 401,
          member: null,
          message: "Unauthorized Action",
        };
        break;
      case 500:
        return {
          code: 500,
          member: null,
          message: "[Server Error]: " + res.data,
        };
        break;
      case 400:
      case 401:
      default:
        return {
          code: 400,
          member: null,
          message: "Something went wrong, please try again",
        };
        break;
    }
  }

  async function editMember(member, newMember) {
    for (let i in newMember) {
      if (newMember[i].length <= 1 && i != "permissions") delete newMember[i];
    }
    const res = await axios.post(
      "https://phone-acc.netlify.app/api/manageUsers",
      {
        oldUser: member,
        newUser: newMember,
        operation: "edit",
        adminEmail: currentUser.email,
      }
    );

    switch (res.status) {
      case 200:
        refreshMembers();
        return {
          code: 200,
          member: res.data,
          message: "Member updated successfully",
        };
        break;
      case 204:
        return {
          code: 204,
          member: null,
          message: "Option still in development",
        };
        break;

      case 401:
        return {
          code: 401,
          member: null,
          message: "Unauthorized Action",
        };
        break;
      case 500:
        return {
          code: 500,
          member: null,
          message: "[Server Error]: " + res.data,
        };
        break;
      case 400:
      case 401:
      case 404:
      default:
        return {
          code: 400,
          member: null,
          message: "Something went wrong, please try again",
        };
        break;
    }
  }

  async function deleteMember(member) {
    const res = await axios.post(
      "https://phone-acc.netlify.app/api/manageUsers",
      {
        userEmail: member.email,
        operation: "delete",
        adminEmail: currentUser.email,
      }
    );
    refreshMembers();
  }

  async function refreshProducts() {
    return await axios
      .get("https://phone-acc.netlify.app/api/manageProducts")
      .then((re) => {
        setProducts(re.data);
        return re.data;
      })
      .catch((err) => {
        console.log("error refreshing products", err.message);
        return [];
      });
  }

  async function refreshMembers() {
    return await axios
      .get("https://phone-acc.netlify.app/api/manageUsers")
      .then((re) => {
        setMembers(re.data);
        return re.data;
      })
      .catch((err) => {
        console.log("error refreshing users", err.message);
        return [];
      });
  }

  async function refreshSoldItems() {
    await refreshMembers().then((re) => {
      // All sold items:
      const allItems = [];
      for (const member of re) {
        if (member.soldItems?.length < 1) continue;
        let items = member.soldItems;
        for (const item of items) {
          item.sellerName = member.name;
          item.sellerEmail = member.email;
        }
        allItems.push(...items);
      }
      allItems.sort((a, b) => new Date(b.soldAt) - new Date(a.soldAt));

      setSoldItems(allItems);
    });
  }

  async function addSoldItem(soldItem) {
    const res = await axios.post("https://phone-acc.netlify.app/api/sold", {
      ...soldItem,
      operation: "add",
      email: currentUser.email,
    });

    switch (res.status) {
      case 200:
        return {
          code: 200,
          member: res.data,
          message: "Sold Item added successfully",
        };
      case 404:
        return {
          code: 404,
          member: null,
          message: "Product Not Found",
        };
      case 422:
        return {
          code: 422,
          member: null,
          message: "Invalid data, refresh and try again",
        };
      case 400:
      case 500:
      default:
        return {
          code: 422,
          member: null,
          message: "Something wrong happened, refresh and try again",
        };
    }
  }

  useEffect(() => {
    // TODO: Check if user exists
    if (localStorage.getItem("currentUser")) {
      let user = localStorage.getItem("currentUser");
      try {
        user = JSON.parse(user);
        if (!user.email) {
          setCurrentUser(null);
          localStorage.removeItem("currentUser");
        } else {
          setCurrentUser(user);
        }
      } catch {
        setCurrentUser(null);
      }
    }
    setLoading(false);
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    changeEmail,
    changePassword,

    members,
    addMember,
    editMember,
    deleteMember,
    refreshMembers,

    products,
    addProduct,
    editProduct,
    deleteProduct,
    refreshProducts,

    soldItems,
    addSoldItem,
    refreshSoldItems,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
