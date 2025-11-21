import { useAuthStore, User } from "../store/authStore";
import { Alert } from "react-native";

export const useAuth = () => {
  const { user, isAuthenticated, isLoading, login, logout, setLoading } =
    useAuthStore();

  const signIn = async (email: string, password: string) => {
    setLoading(true);

    try {
      // Simulación de llamada API - reemplazar con tu lógica real
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Simulando una respuesta exitosa del servidor
      const userData: User = {
        id: "1",
        email: email,
        name: email.split("@")[0], // Nombre basado en el email
      };

      login(userData);
      //Alert.alert("Éxito", `Bienvenido ${userData.name}`);
      return { success: true };
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Credenciales incorrectas");
      return { success: false, error };
    }
  };

  const signOut = () => {
    logout();
    Alert.alert("Sesión cerrada", "Has cerrado sesión exitosamente");
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    signIn,
    signOut,
  };
};
