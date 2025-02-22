 export default [
  {
    id: 1,
    theme: " VIRTUAL SESSION",
    src: "https://res.cloudinary.com/codepally/image/upload/v1629491241/fun_way_to_learn_programmingBN_uugsnu.jpg",
    text: " Summer Maker Club",
    text1:
      "Propelling kids into successful future careers through exposure to STEM. Age 8 - 18 years old.",
    text2: "Mr Okoye",
    button1: (
      <a
      className="button is-success   is-rounded"
        target="_blank"
        href={`https://api.whatsapp.com/send?phone=+2348033939083&text=${"VIRTUAL CLASS ON SLIDER"} `}
        style={{
          position: "relative",
          marginRight: "5%",
          background: "#0F1B41",
        }}
      >
        VIRTUAL
      </a>
    ),
    button2: (
      <a
      className="button is-success  is-rounded"
        target="_blank"
        href={`https://api.whatsapp.com/send?phone=+2348033939083&text=${"PHYSICAL"} `}
        style={{
          position: "relative",
          marginRight: "5%",
          background: "#10BA9B",
        }}
      >
        PHYSICAL{" "}
      </a>
    ),
  },
  {
    id: 3,
    theme: "",
    src: "https://res.cloudinary.com/codepally/image/upload/v1629491239/FUTURE_tb6n58.jpg",
    text: "Physical Activities",
    text1:
      "A fun way to learn programming and develop problem-solving & critical thinking skills! Ages 5-18 ",
    button1: (
      <a
      className="button is-success   is-rounded"
        target="_blank"
        href={`https://api.whatsapp.com/send?phone=+2348033939083&text=${"VIRTUAL CLASS ON SLIDER"} `}
        style={{
          position: "relative",
          marginRight: "5%",
          background: "#0F1B41",
        }}
      >
        VIRTUAL
      </a>
    ),
    button2: (
      <a
      className="button is-success  is-rounded"
        target="_blank"
        href={`https://api.whatsapp.com/send?phone=+2348033939083&text=${"PHYSICAL"} `}
        style={{
          position: "relative",
          marginRight: "5%",
          background: "#10BA9B",
        }}
      >
        PHYSICAL{" "}
      </a>
    ),
  },
  {
    id: 2,
    src: "https://res.cloudinary.com/codepally/image/upload/v1629491241/Ridora_subscribe_now_ppokkg.jpg",
    text: "Subscribe to our YouTube channel ",
    text1:
      "Get access to engaging fun activities to keep up the fun Science discovery.  ",
    follow: (
      <div style={{ display: "flex", height: "2px" }} className="home-sco-body">
        <a href="https://www.facebook.com/Ridora_ng-106509758398813"  target="_blank">
          {" "}
          <div className="home-icon-sco facebook">
            <a  target="_blank">
              {" "}
              <i className="fab fa-facebook-f"></i>{" "}
            </a>
          </div>
        </a>
        <a href="https://twitter.com/ridorastem?s=08"  target="_blank">
          <div className="home-icon-sco twitter">
            {" "}
            <a  target="_blank">
              <i className="fa fa-twitter"></i>
            </a>
          </div>
        </a>
        <a href="https://www.instagram.com/ridorastem"  target="_blank">
          <div className="home-icon-sco instagram">
            <a  target="_blank">
              {" "}
              <i className="fa fa-instagram"></i>
            </a>
          </div>
        </a>
        <a
          href="https://www.youtube.com/channel/UC-SHDJPSGFH5YIe3rhrtoyA"
          target="_blank"
        >
          {" "}
          <div className="home-icon-sco youtube">
            {" "}
            <a  target="_blank">
              <i className="fa fa-youtube-play"></i>
            </a>
          </div>
        </a>
      </div>
    ),
  },
];
