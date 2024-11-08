import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, Image } from "react-native";
import { Link } from "expo-router";
import { ButtonField, InputField } from "@/components/index";
const favicon = require("../../assets/images/favicon.png");

interface FormErrors {
    fullname?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
}


const SignUpScreen: React.FC = () => {
    const [fullname, setFullName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<FormErrors>({});  

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!fullname) {
            newErrors.fullname = "Full name is required";
        }

        if (!email) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = "Email is invalid";
        }

        if (!password) {
            newErrors.password = "Password is required";
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (password != confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


  const handleSignUp = async (): Promise<void> => {
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      // Simulate API call
    } catch (error) {
      //Error
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Image source={favicon} style={styles.logo} />

        <InputField
          label="Full Name"
          value={fullname}
          onChangeText={(text: string) => {
            setFullName(text);
            if (errors.fullname) {
              setErrors((prev) => ({ ...prev, fullname: undefined }));
            }
          }}
          placeholder="Enter your full name"
          keyboardType="email-address"
          error={errors.fullname}
        />

        <InputField
          label="Email"
          value={email}
          onChangeText={(text: string) => {
            setEmail(text);
            if (errors.email) {
              setErrors((prev) => ({ ...prev, email: undefined }));
            }
          }}
          placeholder="Enter your full name"
          keyboardType="email-address"
          error={errors.email}
        />


        <InputField
          label="Password"
          value={password}
          onChangeText={(text: string) => {
            setPassword(text);
            if (errors.password) {
              setErrors((prev) => ({ ...prev, password: undefined }));
            }
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
            if (errors.confirmPassword) {
              setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
            }
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

        {/* <View style={styles.dividerContainer}>
          <Text style={styles.dividerText}>or</Text>
        </View>
        <Link href="./signUp" asChild>
          <ButtonField
            title="Sign In"
            onPress={() => console.log("Sign In pressed")}
            variant="link"
          />
        </Link> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  formContainer: {
    padding: 20,
  },
  signUpButton: {
    marginTop: 20,
  },
  forgotPassword: {
    alignItems: "center",
    marginTop: 20,
  },
  dividerContainer: {
    alignItems: "center",
    marginVertical: 20,
  },
  dividerText: {
    color: "#666",
  },
  logo: {
    width: "100%",
    resizeMode: "contain",
  },
});

  

export default SignUpScreen;
