import { useNavigate } from "react-router-dom";

const useNavigation = () => {
  const navigate = useNavigate();

  const navigateTo = (page) => {
    switch (page) {
      case "home":
        navigate("/emp_homepage");
        break;
      case "manage-docs":
        navigate("/emp_managedocs");
        break;
      case "borrow-return":
        navigate("/emp_borrow_register");
        break;
      case "personal-info":
      case "profile":
        navigate("/emp_personalinfo");
        break;
      case "add-document":
        navigate("/emp_adddocument");
        break;
      case "hoa-dai-cuong":
      case "next-page":
      case "previous-page":
        navigate("/emp_managedocs");
        break;
      default:
        console.log("Page not found.");
    }
  };

  return { navigateTo };
};

export default useNavigation;
