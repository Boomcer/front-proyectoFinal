import { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import Swal from "sweetalert2";
import { clearCarrito } from "../helpers/apiUsuarios";
import styles from "../css/CreditCard.module.css"; 

export default function CreditCardForm() {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardMonth, setCardMonth] = useState("");
  const [cardYear, setCardYear] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const uid = localStorage.getItem("uid");
  const navigate = useNavigate(); 

  const handlePurchase = async () => {
    try {
      await clearCarrito(uid); 
      Swal.fire({
        icon: "success",
        title: "¡Compra realizada con éxito!",
        text: "Pronto te estará llegando un mail con los detalles de tu compra!!!",
        confirmButtonText: "Aceptar",
      }).then(() => {
        navigate("/");
      });
    } catch (error) {
      console.error("Error al vaciar el carrito:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al procesar la compra.",
        confirmButtonText: "Intentar de nuevo",
      });
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.cardFormInner}>
        <div className={styles.cardInput}>
          <label className={styles.cardInputLabel}>Número de tarjeta</label>
          <input
            type="text"
            className={styles.cardInputField}
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
        </div>
        <div className={styles.cardInput}>
          <label className={styles.cardInputLabel}>Titular de la tarjeta</label>
          <input
            type="text"
            className={styles.cardInputField}
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
          />
        </div>
        <div className={styles.cardFormRow}>
          <div className={styles.cardFormCol}>
            <label className={styles.cardInputLabel}>Fecha Vencimiento</label>
            <select
              className={`${styles.cardInputField} ${styles.select}`}
              value={cardMonth}
              onChange={(e) => setCardMonth(e.target.value)}
            >
              <option value="" disabled>
                Mes
              </option>
              {[...Array(12).keys()].map((n) => (
                <option key={n + 1} value={n + 1}>
                  {n + 1}
                </option>
              ))}
            </select>
            <select
              className={`${styles.cardInputField} ${styles.select}`}
              value={cardYear}
              onChange={(e) => setCardYear(e.target.value)}
            >
              <option value="" disabled>
                Año
              </option>
              {[...Array(12).keys()].map((n) => (
                <option key={n} value={new Date().getFullYear() + n}>
                  {new Date().getFullYear() + n}
                </option>
              ))}
            </select>
          </div>
          <div className={`${styles.cardFormCol} ${styles.cvv}`}>
            <label className={styles.cardInputLabel}>CVV</label>
            <input
              type="text"
              className={styles.cardInputField}
              value={cardCvv}
              onChange={(e) => setCardCvv(e.target.value)}
            />
          </div>
        </div>
        <button className={styles.cardFormButton} onClick={handlePurchase}>
          Comprar
        </button>
      </div>
    </div>
  );
}
