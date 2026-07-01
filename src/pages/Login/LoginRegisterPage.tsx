import { useForm } from "react-hook-form";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "../../shared/api/auth.api";
import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";

type LoginFormValues = {
  email: string;
  password: string;
}

export default function LoginRegisterPage() {
  const {register, handleSubmit} = useForm<LoginFormValues>({
    defaultValues: {
      password: "",
      email: "",
    }
  });
  const history = useHistory();
  const { login } = useAuth();

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: ({user}) => {
      login(user);
      history.push("/");
    },
    onError: (error) => {
      console.error(error)
    }
  });
  const onSubmit = (data: LoginFormValues) => {
    loginMutation.mutate({ user: data });
  }
  return (
    <>
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign up</h1>
              {/*<p className="text-xs-center">*/}
              {/*  <a href="">Have an account?</a>*/}
              {/*</p>*/}

              {/*<ul className="error-messages">*/}
              {/*  <li>That email is already taken</li>*/}
              {/*</ul>*/}

              <form onSubmit={handleSubmit(onSubmit)}>
                {/*<fieldset className="form-group">*/}
                {/*  <input className="form-control form-control-lg" type="text" placeholder="Your Name" />*/}
                {/*</fieldset>*/}
                <fieldset className="form-group">
                  <Input className="form-control form-control-lg" type="text" placeholder="Email" {...register("email")}  />
                </fieldset>
                <fieldset className="form-group">
                  <Input className="form-control form-control-lg" type="password" placeholder="Password" {...register("password")}/>
                </fieldset>
                <Button size={"lg"} skin={"primary"} className={"form-button"}  type={"submit"}>Sign in</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
