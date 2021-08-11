import "./ContactUs.css";
import { FaLinkedin } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import jungahProfile from "assets/Jungah Profile.jpeg";
import camilaProfile from "assets/Camila Profile.jpg";
import robertProfile from "assets/Robert Profile.jpg";

const defaultImage =
  "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.calendarclub.co.uk%2F-%2Fmedia%2Fproductimages%2F18%2F66%2F186694_main.jpg&f=1&nofb=1";

export default function ContactUs() {
  return (
    <>
      <div className="ContactUs">
        <div className="title">
          <h1>Contact Us</h1>
          <p className="teca-email">
            <GrMail size="20"/>
            <span hidden>Email</span> services.teca@gmail.com
          </p>
        </div>

        <div className="contact-cards">
          <div className="card">
            <img
              classname="profile jungah"
              alt="profile cover"
              src={jungahProfile}
            />
            <div className="info">
              <div className="name">
                <h2>Jungah Ahn</h2>
              </div>
              <div className="title">CodePath x Workday SITE Intern</div>
              <div>
                Jungah studies Computer Science, Math, and Business at Hunter
                College - CUNY. She loves to read, cook, hike, and over the past
                year and a half has been learning how to surf in the freezing
                waters of the Bay Area where she lives. She has two dogs and a
                very needy cat.{" "}
              </div>

              <a
                href="https://www.linkedin.com/in/jungah-ahn-1bb184142/"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>

          <div className="card">
            <img alt="profile cover" src={camilaProfile} />
            <div className="info">
              <div className="name">
                <h2>Camila Iligaray</h2>
              </div>
              <div className="title">CodePath x Workday SITE Intern</div>
              <div>
                Camila is a third year student at Florida International
                University where she studies Computer Science. She was born in
                Chile and moved to Florida when she was 16 years old. Some of
                Camila’s hobbies include playing soccer, playing the guitar, and
                building legos.{" "}
              </div>

              <a
                href="https://www.linkedin.com/in/camila-iligaray-b02741190/"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>

          <div className="card">
            <img alt="profile cover" src={robertProfile} />
            <div className="info">
              <div className="name">
                <h2>Robert Velasco</h2>
              </div>
              <div className="title">CodePath x Workday SITE Intern</div>
              <div>
                Robert is a rising junior studying Computer Science and Art at
                Swarthmore College, though he is originally from San Francisco.
                Outside of coding and art, Robert enjoys playing guitar and
                learning how to cook. His favorite candy is Sour Patch Kids.{" "}
              </div>

              <a
                href="https://www.linkedin.com/in/velascor/"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
