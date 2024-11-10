import React, { useState } from "react";
import { StyleSheet, Image, View, ActivityIndicator, ScrollView } from "react-native";
import {
  ButtonField,
  InputField,
  FormLayout,
  CustomSnackBar,
} from "@/components/index";
import useApiCall from "@/hooks/useApiCall";
import createUser from "@/api/users/signup";
import { useSession } from "@/hooks/useSession";
const favicon = require("@/assets/images/favicon.png");

interface FormErrors {
  fullname?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const SignUpScreen: React.FC = () => {
  const { execute } = useApiCall(createUser);
  const { newSession } = useSession();

  const [fullname, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!fullname) {
      newErrors.fullname = "Full name is required";
      setSnackbarMessage("Invalid Sign In");
    }
    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
      setSnackbarMessage("Invalid Sign In");
    }
    if (!password) {
      newErrors.password = "Password is required";
      setSnackbarMessage("Invalid Sign In");
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      setSnackbarMessage("Invalid Sign In");
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      setSnackbarMessage("Invalid Sign In");
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) setSnackbarVisible(true);

    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async (): Promise<void> => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const options = {
        data: {
          full_name: fullname,
        },
      };

      const data = await execute({ email, password, options });
      if (data.data) {
        newSession(data.data);
      }
    } catch (error) {
      // Error handling
    } finally {
      setLoading(false);
    }
  };

  return loading ? (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#00ff00" />
    </View>
  ) : (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <FormLayout>
        <Image source={favicon} style={styles.logo} />

        <InputField
          label="Full Name"
          value={fullname}
          onChangeText={(text: string) => {
            setFullName(text);
            if (errors.fullname)
              setErrors((prev) => ({ ...prev, fullname: undefined }));
          }}
          placeholder="Enter your full name"
          keyboardType="default"
          error={errors.fullname}
        />

        <InputField
          label="Email"
          value={email}
          onChangeText={(text: string) => {
            setEmail(text);
            if (errors.email)
              setErrors((prev) => ({ ...prev, email: undefined }));
          }}
          placeholder="Enter your email address"
          keyboardType="email-address"
          error={errors.email}
        />

        <InputField
          label="Password"
          value={password}
          onChangeText={(text: string) => {
            setPassword(text);
            if (errors.password)
              setErrors((prev) => ({ ...prev, password: undefined }));
          }}
          placeholder="Enter your password"
          secureTextEntry
          error={errors.password}
        />

        <InputField
          label="Confirm Password"
          value={confirmPassword}
          onChangeText={(text: string) => {
            setConfirmPassword(text);
            if (errors.confirmPassword)
              setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
          }}
          placeholder="Confirm your password"
          secureTextEntry
          error={errors.confirmPassword}
        />

        <ButtonField
          title="Sign Up"
          onPress={handleSignUp}
          style={styles.signUpButton}
          loading={loading}
          disabled={loading}
        />
      </FormLayout>

      {/* CustomSnackbar Component */}
      <CustomSnackBar
        visible={snackbarVisible}
        message={snackbarMessage} // Pass the dynamic error message
        onDismiss={() => setSnackbarVisible(false)}
        actionLabel="Dismiss"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  scrollContainer: {
  },
  signUpButton: {
    marginTop: 10,
    marginBottom: 10,
  },
  logo: {
    width: "100%",
    resizeMode: "contain",
  },
});

export default SignUpScreen;

// import React, { useState } from "react";
// import { StyleSheet, Image, View, ActivityIndicator, ScrollView } from "react-native";
// import {
//   ButtonField,
//   InputField,
//   FormLayout,
//   CustomSnackBar,
// } from "@/components/index";
// import useApiCall from "@/hooks/useApiCall";
// import createUser from "@/api/users/signup";
// import { useSession } from "@/hooks/useSession";
// const favicon = require("@/assets/images/favicon.png");

// interface FormErrors {
//   fullname?: string;
//   email?: string;
//   password?: string;
//   confirmPassword?: string;
// }

// const SignUpScreen: React.FC = () => {
//   const { execute } = useApiCall(createUser);
//   const { newSession } = useSession();

//   const [fullname, setFullName] = useState<string>("");
//   const [email, setEmail] = useState<string>("");
//   const [password, setPassword] = useState<string>("");
//   const [confirmPassword, setConfirmPassword] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);
//   const [errors, setErrors] = useState<FormErrors>({});
//   const [snackbarVisible, setSnackbarVisible] = useState<boolean>(false);
//   const [snackbarMessage, setSnackbarMessage] = useState<string>("");

//   const validateForm = (): boolean => {
//     const newErrors: FormErrors = {};
//     let errorMessage = "";
//     let errorMessageSnack ="";

//     if (!fullname) newErrors.fullname = "Full name is required";

//     if (!fullname) {
//       newErrors.fullname = "Full name is required";
//       setSnackbarMessage("Full name is required");
//       errorMessageSnack = "Invalid Sign Up";
//     } else if (!email) {
//       newErrors.email = "Email is required";
//       setSnackbarMessage("Email is required");
//       errorMessageSnack = "Invalid Sign Up";
//     } else if (!/\S+@\S+\.\S+/.test(email)) {
//       newErrors.email = "Email is invalid";
//       errorMessage = "Email is invalid";
//       errorMessageSnack = "Invalid Sign Up";
//     } else if (!password) {
//       newErrors.password = "Password is required";
//       errorMessage = "Password is required";
//       errorMessageSnack = "Invalid Sign Up";
//     } else if (password.length < 6) {
//       newErrors.password = "Password must be at least 6 characters";
//       errorMessage = "Password must be at least 6 characters";
//       errorMessageSnack = "Invalid Sign Up";
//     } else if (password !== confirmPassword) {
//       newErrors.confirmPassword = "Passwords do not match";
//       errorMessage = "Passwords do not match";
//       errorMessageSnack = "Invalid Sign Up";
//     }

//     setErrors(newErrors);
//     if (Object.keys(newErrors).length > 0) {
//       setSnackbarMessage(errorMessageSnack); // Set specific error message
//       setSnackbarVisible(true);
//     }

//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSignUp = async (): Promise<void> => {
//     if (!validateForm()) return;

//     setLoading(true);
//     try {
//       const options = {
//         data: {
//           full_name: fullname,
//         },
//       };

//       const data = await execute({ email, password, options });
//       if (data.data) {
//         newSession(data.data);
//       }
//     } catch (error) {
//       // Error handling
//     } finally {
//       setLoading(false);
//     }
//   };

//   return loading ? (
//     <View style={styles.container}>
//       <ActivityIndicator size="large" color="#00ff00" />
//     </View>
//   ) : (
//     <ScrollView contentContainerStyle={styles.scrollContainer}>
//       <FormLayout>
//         <Image source={favicon} style={styles.logo} />

//         <InputField
//           label="Full Name"
//           value={fullname}
//           onChangeText={(text: string) => {
//             setFullName(text);
//             if (errors.fullname)
//               setErrors((prev) => ({ ...prev, fullname: undefined }));
//           }}
//           placeholder="Enter your full name"
//           keyboardType="default"
//           error={errors.fullname}
//         />

//         <InputField
//           label="Email"
//           value={email}
//           onChangeText={(text: string) => {
//             setEmail(text);
//             if (errors.email)
//               setErrors((prev) => ({ ...prev, email: undefined }));
//           }}
//           placeholder="Enter your email address"
//           keyboardType="email-address"
//           error={errors.email}
//         />

//         <InputField
//           label="Password"
//           value={password}
//           onChangeText={(text: string) => {
//             setPassword(text);
//             if (errors.password)
//               setErrors((prev) => ({ ...prev, password: undefined }));
//           }}
//           placeholder="Enter your password"
//           secureTextEntry
//           error={errors.password}
//         />

//         <InputField
//           label="Confirm Password"
//           value={confirmPassword}
//           onChangeText={(text: string) => {
//             setConfirmPassword(text);
//             if (errors.confirmPassword)
//               setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
//           }}
//           placeholder="Confirm your password"
//           secureTextEntry
//           error={errors.confirmPassword}
//         />

//         <ButtonField
//           title="Sign Up"
//           onPress={handleSignUp}
//           style={styles.signUpButton}
//           loading={loading}
//           disabled={loading}
//         />
//       </FormLayout>

//       {/* CustomSnackbar Component */}
//       <CustomSnackBar
//         visible={snackbarVisible}
//         message={snackbarMessage} // Pass the dynamic error message
//         onDismiss={() => setSnackbarVisible(false)}
//         actionLabel="Dismiss"
//       />
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   scrollContainer: {
//     flexGrow: 0.5,
//     justifyContent: 'center',
//     padding: 10,
//   },
//   signUpButton: {
//     marginTop: 10,
//     marginBottom: 10,
//   },
//   logo: {
//     width: "100%",
//     resizeMode: "contain",
//   },
// });

// export default SignUpScreen;
