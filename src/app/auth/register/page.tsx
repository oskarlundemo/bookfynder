import {AuthUI} from "../../../components/auth/AuthUI";
import {children} from "effect/Fiber";
import RegisterForm from "../../../components/auth/RegisterForm";

export default function Register() {
    return (
        <AuthUI>
            <RegisterForm/>
        </AuthUI>
    )
}