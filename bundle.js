(function(modules) {
  var installedModules = {};

  function __webpack_require__(moduleId) {
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    var module = installedModules[moduleId] = {
      exports: {}
    };

    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    return module.exports;
  }

  return __webpack_require__("./src/index.js");
})({
  "./src/index.js": function(module, exports, __webpack_require__) {
    const React = __webpack_require__('react');
    const ReactDOM = __webpack_require__('react-dom');
    const App = __webpack_require__('./src/components/App.js').default;
    const Router = __webpack_require__('react-router-dom').BrowserRouter;
    const Route = __webpack_require__('react-router-dom').Route;
    const Switch = __webpack_require__('react-router-dom').Switch;

    ReactDOM.createRoot(document.getElementById('root')).render(
      React.createElement(Router, null, 
        React.createElement(Switch, null,
          React.createElement(Route, { exact: true, path: "/", component: App })
        )
      )
    );
  },
  "./src/components/App.js": function(module, exports, __webpack_require__) {
    const React = __webpack_require__('react');
    const TopBar = __webpack_require__('./src/components/TopBar.js').default;
    const LandingPage = __webpack_require__('./src/components/LandingPage.js').default;
    const Cart = __webpack_require__('./src/components/Cart.js').default;
    const Login = __webpack_require__('./src/components/Login.js').default;
    const Register = __webpack_require__('./src/components/Register.js').default;
    const Profile = __webpack_require__('./src/components/Profile.js').default;
    const Router = __webpack_require__('react-router-dom').BrowserRouter;
    const Route = __webpack_require__('react-router-dom').Route;
    const Switch = __webpack_require__('react-router-dom').Switch;

    module.exports.default = function App() {
      return (
        React.createElement(Router, null,
          React.createElement("div", null,
            React.createElement(TopBar, null),
            React.createElement("div", { className: "content" },
              React.createElement(Switch, null,
                React.createElement(Route, { exact: true, path: "/", component: LandingPage }),
                React.createElement(Route, { path: "/cart", component: Cart }),
                React.createElement(Route, { path: "/login", component: Login }),
                React.createElement(Route, { path: "/register", component: Register }),
                React.createElement(Route, { path: "/profile", component: Profile })
              )
            )
          )
        )
      );
    };
  },
  "./src/components/LandingPage.js": function(module, exports, __webpack_require__) {
    const React = __webpack_require__('react');
    module.exports.default = function LandingPage() {
      return React.createElement("div", null, "Welcome to the Stuffed Animal Shop!");
    };
  },
  "./src/components/Cart.js": function(module, exports, __webpack_require__) {
    const React = __webpack_require__('react');
    const axios = __webpack_require__('axios');

    module.exports.default = function Cart() {
      const [cart, setCart] = React.useState(null);

      React.useEffect(() => {
        fetchCart();
      }, []);

      const fetchCart = async () => {
        try {
          const response = await axios.get('/cart');
          setCart(response.data);
        } catch (error) {
          console.error('Error fetching cart:', error);
        }
      };

      const handleRemoveItem = async (productId) => {
        try {
          await axios.delete(`/cart/remove/${productId}`);
          fetchCart();
        } catch (error) {
          console.error('Error removing item from cart:', error);
        }
      };

      return (
        React.createElement("div", null,
          React.createElement("h2", null, "Cart"),
          cart ? (
            React.createElement("div", null,
              React.createElement("h3", null, "Items in Cart"),
              React.createElement("ul", null,
                cart.items.map(item => (
                  React.createElement("li", { key: item.productId },
                    `${item.productId} - Quantity: ${item.quantity}`,
                    React.createElement("button", { onClick: () => handleRemoveItem(item.productId) }, "Remove")
                  )
                ))
              )
            )
          ) : (
            React.createElement("p", null, "Loading...")
          )
        )
      );
    };
  },
  "./src/components/Login.js": function(module, exports, __webpack_require__) {
    const React = __webpack_require__('react');
    const axios = __webpack_require__('axios');

    module.exports.default = function Login() {
      const [email, setEmail] = React.useState('');
      const [password, setPassword] = React.useState('');

      const handleLogin = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('/login', { email, password });
          console.log('Login successful:', response.data);
        } catch (error) {
          console.error('Error logging in:', error);
        }
      };

      return (
        React.createElement("div", { className: "login-container" },
          React.createElement("h2", null, "Login"),
          React.createElement("form", { onSubmit: handleLogin },
            React.createElement("label", null, "Email:"),
            React.createElement("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value) }),
            React.createElement("label", null, "Password:"),
            React.createElement("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value) }),
            React.createElement("button", { type: "submit" }, "Login")
          )
        )
      );
    };
  },
  "./src/components/Register.js": function(module, exports, __webpack_require__) {
    const React = __webpack_require__('react');
    const axios = __webpack_require__('axios');

    module.exports.default = function Register() {
      const [email, setEmail] = React.useState('');
      const [name, setName] = React.useState('');
      const [lastname, setLastname] = React.useState('');
      const [password, setPassword] = React.useState('');

      const handleRegister = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('/register', { email, name, lastname, password });
          console.log('Registration successful:', response.data);
        } catch (error) {
          console.error('Error registering:', error);
        }
      };

      return (
        React.createElement("div", { className: "register-container" },
          React.createElement("h2", null, "Register"),
          React.createElement("form", { onSubmit: handleRegister },
            React.createElement("label", null, "Email:"),
            React.createElement("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value) }),
            React.createElement("label", null, "Name:"),
            React.createElement("input", { type: "text", value: name, onChange: (e) => setName(e.target.value) }),
            React.createElement("label", null, "Lastname:"),
            React.createElement("input", { type: "text", value: lastname, onChange: (e) => setLastname(e.target.value) }),
            React.createElement("label", null, "Password:"),
            React.createElement("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value) }),
            React.createElement("button", { type: "submit" }, "Register")
          )
        )
      );
    };
  },
  "./src/components/Profile.js": function(module, exports, __webpack_require__) {
    const React = __webpack_require__('react');
    const axios = __webpack_require__('axios');

    module.exports.default = function Profile() {
      const [user, setUser] = React.useState(null);

      React.useEffect(() => {
        fetchUserProfile();
      }, []);

      const fetchUserProfile = async () => {
        try {
          const response = await axios.get('/profile');
          setUser(response.data.user);
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      };

      return (
        React.createElement("div", { className: "profile-container" },
          React.createElement("h2", null, "Profile"),
          user ? (
            React.createElement("div", null,
              React.createElement("p", null, `Email: ${user.email}`),
              React.createElement("p", null, `Name: ${user.name}`),
              React.createElement("p", null, `Lastname: ${user.lastname}`)
            )
          ) : (
            React.createElement("p", null, "Loading...")
          )
        )
      );
    };
  }
});
