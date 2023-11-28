/*mainresult js*/

import React, { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import Footer from "../components/Footer";
import ComatHeader from "../components/ComatHeader";
import { numParticipantsState, userState } from "../Atoms";
import "./MainpageLogin.css";
import { useNavigate } from "react-router-dom";

function MainpageLogin() {
  const navigate = useNavigate();
  const formData = useRecoilValue(userState);
  const [numParticipants, setNumParticipants] =
    useRecoilState(numParticipantsState);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const response = await axios.get("https://onesons.site/participations");
        setNumParticipants(response.data);
      } catch (error) {
        console.error("Error fetching participants:", error);
      }
    };

    fetchParticipants();
  }, [setNumParticipants]);

  const handleVisitGuide = () => {
    navigate("/guide"); // "_blank"를 추가하여 새 창에서 열도록 설정
  };
  const handleVisitmatch = () => {
    navigate("/match"); // "_blank"를 추가하여 새 창에서 열도록 설정
  };
  const handleVisitLoading = () => {
    navigate("/Loading"); // "_blank"를 추가하여 새 창에서 열도록 설정
  };
  const handleVisitcheckresult = () => {
    navigate("/checkresult"); // "_blank"를 추가하여 새 창에서 열도록 설정
  };

  return (
    <div className="container">
      <ComatHeader destination="/" buttonText="로그아웃" />
      <div className="login-content">
        <div
          className="login-name"
          style={{ fontSize: "40px", fontWeight: "bolder" }}
        >
          김규원님,
          <br />
          환영합니다.
        </div>
        <div
          className="myinfo"
          style={{ fontSize: "15px", fontWeight: "bolder" }}
        >
          my info
        </div>
        <div className="MainLoginItem">
          <div className="MainLoginTopline">
            <div className="MainLoginInlineItem">
              <div className="MainLoginTopic">전공</div>
              {/* <div className="MainLoginText">{item.year}</div> */}
              <div className="MainLoginText">{formData.depart}</div>
            </div>
            <div className="MainLoginInlineItem2">
              <div className="MainLoginTopic">학번</div>
              {/* <div className="MainLoginText">{item.depart}</div> */}
              <div className="MainLoginText">{formData.year}</div>
            </div>
          </div>
          <div className="MainLoginInline">
            <div className="MainLoginInlineItem">
              <div className="MainLoginTopic">좋아하는 노래</div>
              {/* <div className="MainLoginText">{item.mbti}</div> */}
              <div className="MainLoginText">{formData.song}</div>
            </div>
            <div className="MainLoginInlineItem2">
              <div className="MainLoginTopic">MBTI</div>
              {/* <div className="MainLoginText">{item.song}</div> */}
              <div className="MainLoginText">{formData.mbti}</div>
            </div>
          </div>
          <div className="MainLoginBottom">@kim.q1</div>
        </div>

        <div>
          <button className="matching-button" onClick={handleVisitmatch}>
            매칭하기 ▶
            <div
              style={{
                fontSize: "15px",
                fontWeight: "w600",
                marginTop: "5px",
                fontWeight: "bolder",
              }}
            >
              현재{" "}
              <span style={{ color: "#FF4D61", fontWeight: "900" }}>
                {numParticipants}
              </span>
              명 참여중이에요!
            </div>
          </button>
        </div>
        <div className="number-button">
          <div className="number-text">나의 매칭가능 횟수</div>
          <div className="number-bottom">
            <span className="number-text2">{formData.chance}</span>
            <button className="number-charge" onClick={handleVisitLoading}>
              충전하기
            </button>
          </div>
        </div>
        <div className="button-group">
          <button
            className="button-group-search"
            onClick={handleVisitcheckresult}
          >
            <img
              src={process.env.PUBLIC_URL + `assets/main_search.png`}
              alt="조회버튼"
            />
            <br></br>
            조회하기
          </button>
          <button className="button-group-guide" onClick={handleVisitGuide}>
            <img
              src={process.env.PUBLIC_URL + `assets/main_guide.png`}
              alt="조회버튼"
            />
            <br></br>
            COMAtching<br></br>
            가이드북
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MainpageLogin;
