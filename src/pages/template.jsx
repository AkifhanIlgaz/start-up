import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCol,
  IonContent,
  IonGrid,
  IonInput,
  IonPage,
  IonRow,
} from "@ionic/react";
import React from "react";

const Login = () => {
  const [form, setForm] = React.useState({});

  const doLogin = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <IonPage>
      <IonContent scrollY={false}>
        <IonGrid style={{ height: "100%", width: "100%" }}>
          <IonRow
            className="ion-align-items-center ion-justify-content-center "
            style={{
              height: "100%",
              width: "100%",
            }}
          >
            <IonCol>
              <div className="ion-text-center ion-padding">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg"
                  width={"50%"}
                />
              </div>
              <IonCard style={{ boxShadow: "none" }}>
                <IonCardContent>
                  <form onSubmit={doLogin}>
                    <IonInput
                      label="Email"
                      placeholder="johndoe@gmail.com"
                      type="email"
                      labelPlacement="floating"
                      required="true"
                      onIonInput={(e) =>
                        setForm({ ...form, email: e.detail.value })
                      }
                    ></IonInput>

                    <IonInput
                      className="ion-margin-top "
                      label="Password"
                      type="password"
                      labelPlacement="floating"
                      required="true"
                      onIonInput={(e) =>
                        setForm({ ...form, password: e.detail.value })
                      }
                    ></IonInput>

                    <IonButton
                      color="button"
                      className="ion-margin-top"
                      type="submit"
                      expand="block"
                      shape="round"
                    >
                      <span style={{ color: "#fff" }}>Log In</span>
                    </IonButton>
                  </form>
                  <div className="ion-text-center ion-padding-top">
                    <a
                      className="forgot-font"
                      href="#"
                      style={{ textDecoration: "none", color: "green" }}
                    >
                      Forgot your password ?
                    </a>
                  </div>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Login;
