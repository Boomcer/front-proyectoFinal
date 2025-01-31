import { useRef } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";

function Contact() {
  const formRef = useRef();

  const serviceId = "service_4ejfj0n";
  const templateId = "template_wa7zacz";
  const apiKey = "he53Jhp8NN5s-yWEG";

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(serviceId, templateId, formRef.current, apiKey)
      .then(() => {
        
        Swal.fire({
          icon: "success",
          title: "¡Mensaje enviado!",
          text: "Tu mensaje ha sido enviado con éxito.",
          confirmButtonColor: "#28a745",
        });

        formRef.current.reset();
      })
      .catch(() => {
     
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al enviar tu mensaje. Inténtalo de nuevo.",
          confirmButtonColor: "#dc3545",
        });
      });
  };

  return (
    <section id="contactanos" className="py-5 bg-light">
      <div className="container">
        <div className="row">
          <div className="col p-3">
            <h3 className="text-center p-1">Contacto</h3>
          </div>
        </div>

        <div className="row">
       
          <div className="col-12 col-md-6 order-1 order-md-0 my-3">
            <form ref={formRef} onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="correo" className="form-label fw-bold">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  name="user_email"
                  className="form-control"
                  id="correo"
                  placeholder="name@example.com"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="nombre" className="form-label fw-bold">
                  Nombre
                </label>
                <input
                  type="text"
                  name="user_name"
                  className="form-control"
                  id="nombre"
                  placeholder="Ej: Cosme Fulanito"
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="mensaje" className="form-label fw-bold">
                  Mensaje
                </label>
                <textarea
                  name="message"
                  className="form-control"
                  id="mensaje"
                  rows="3"
                  required
                ></textarea>
              </div>

              <div className="d-grid d-md-flex justify-content-md-end">
                <button type="submit" className="btn btn-primary">
                  Enviar
                </button>
              </div>
            </form>
          </div>

       
          <div className="col">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.113779350094!2d-65.20985452498485!3d-26.83633319001602!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225c0ef228d361%3A0xd32c1d98f9664db4!2sGral.%20Paz%20578%2C%20T4000BLL%20San%20Miguel%20de%20Tucum%C3%A1n%2C%20Tucum%C3%A1n!5e0!3m2!1ses-419!2sar!4v1713983001897!5m2!1ses-419!2sar"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
