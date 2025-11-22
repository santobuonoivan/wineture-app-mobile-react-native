import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";

export const CircleInfoIcon = (props: any) => (
  <FontAwesome6 name="circle-info" size={24} color="white" {...props} />
);

export const HomeIcon = (props: any) => (
  <FontAwesome name="home" size={24} color="white" {...props} />
);

export const InfoIcon = (props: any) => (
  <FontAwesome name="info" size={24} color="white" {...props} />
);

export const CartIcon = (props: any) => (
  <AntDesign name="shopping-cart" size={24} color="white" {...props} />
);

export const MenuIconFold = (props: any) => (
  <AntDesign name="menu-fold" size={24} color="white" {...props} />
);

export const MenuIconUnfold = (props: any) => (
  <AntDesign name="menu-unfold" size={24} color="white" {...props} />
);
