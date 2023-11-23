<<<<<<< HEAD
import React from "react";
import axios from "axios";
import MyInput from "../components/MyInput";
import MBTIButton from "../components/MBTIButton";
import GenderButton from "../components/GenderButton";
import ComatHeader from "../components/ComatHeader";
import majorCategories from "../data/majorCategories";
import { validateForm } from "../myfunction/formValidation";
import { useRecoilState } from "recoil";
import {
  userState,
  selectedMBTIState,
  contactMethodState,
  selectedCategoryState,
  selectedMajorState,
  isContactVerifiedState,
} from "../Atoms";
import { useNavigate } from "react-router-dom";
import "./Form.css";

function Form() {
  const navigate = useNavigate();

  // State variables
  const [user, setUser] = useRecoilState(userState);
  const [selectedMBTI, setSelectedMBTI] = useRecoilState(selectedMBTIState);
  const [contactMethod, setContactMethod] = useRecoilState(contactMethodState);
  const [selectedCategory, setSelectedCategory] = useRecoilState(
    selectedCategoryState
  );
  const [selectedMajor, setSelectedMajor] = useRecoilState(selectedMajorState);
  const [isContactVerified, setIsContactVerified] = useRecoilState(
    isContactVerifiedState
  );

  function validateYear(value) {
    return /^\d{0,2}$/.test(value);
  }

  function validatePhone(value) {
    return /^\d{0,11}$/.test(value);
  }

  function validateSong(value) {
    return /^[^?~!@#$%^&*()+'"<>\\/|{}[\]_=;:]{0,30}$/.test(value);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "year" && !validateYear(value)) {
      alert("학번은 2자리의 숫자로 입력하세요. (예: 22)");
    } else if (
      name === "phone" &&
      contactMethod === "phone" &&
      !validatePhone(value)
    ) {
      alert("(-)없이 전화번호를 입력하세요. (예: 01012345678)");
    } else if (
      name === "phone" &&
      contactMethod === "insta" &&
      !validatePhone(value)
    ) {
      alert("인스타 아이디는 영어,숫자,언더바(_),마침표(.)만 가능합니다.");
    } else if (name === "song" && !validateSong(value)) {
      alert("노래에는 특수기호를 쓸수 없습니다");
    } else {
      setUser((prevUser) => ({ ...prevUser, [name]: value }));
=======
import React, { useState } from "react";
import axios from "axios";
import "./Form.css";
import { useNavigate } from "react-router-dom";

function Form() {
  const navigate = useNavigate();
  const [contactMethod, setContactMethod] = useState("phone");
  const [selectedEI, setSelectedEI] = useState("");
  const [selectedSN, setSelectedSN] = useState("");
  const [selectedTF, setSelectedTF] = useState("");
  const [selectedPJ, setSelectedPJ] = useState("");
  const [formData, setFormData] = useState({
    depart: "",
    year: "",
    phone: "",
    song: "",
    gender: true,
    mbti: "",
  });

  const majorCategories = [
    {
      label: "인문",
      options: [
        "인문계열",
        "국어국문학과",
        "철학과",
        "국사학과",
        "어문계열",
        "영어영문학부",
        "중국언어문화학과",
        "일어일본문화학과",
        "프랑스어문화학과",
        "음악과",
        "종교학과",
        "신학대학(성신교정)",
      ],
    },
    {
      label: "사회",
      options: [
        "사회과학계열",
        "사회복지학과",
        "심리학과",
        "사회학과",
        "특수교육과",
        "경영계열",
        "경영학과",
        "회계학과",
        "국제·법정경계열",
        "국제학부",
        "법학과",
        "경제학과",
        "행정학과",
        "글로벌경영대학",
        "글로벌미래경영학과",
        "세무회계금융학과",
        "IT파이낸스학과",
      ],
    },
    {
      label: "자연",
      options: [
        "자연과학계열",
        "화학과",
        "수학과",
        "물리학과",
        "생활과학계열",
        "공간디자인·소비자학과",
        "의류학과",
        "아동학과",
        "식품영양학과",
        "의생명과학과",
        "약학대학",
        "간호대학(성의교정)",
        "의과대학(성의교정)",
      ],
    },
    {
      label: "공학",
      options: [
        "ICT공학계열",
        "컴퓨터정보공학부",
        "미디어기술콘텐츠학과",
        "정보통신전자공학부",
        "바이오융합공학계열",
        "생명공학과",
        "에너지환경공학과",
        "바이오메디컬화학공학과 ",
        "인공지능학과",
        "데이터사이언스학과",
        "바이오메디컬소프트웨어학과",
      ],
    },
    {
      label: "타학교",
      options: ["가톨릭대학교가 아닙니다"],
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedMajor, setSelectedMajor] = useState("");
  const [isContactVerified, setIsContactVerified] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "year") {
      if (/^\d{0,2}$/.test(value)) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      } else {
        alert("학번은 2자리의 숫자로 입력하세요. (예: 22)");
      }
    } else if (name === "phone" && contactMethod === "phone") {
      if (/^\d{0,11}$/.test(value)) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      } else {
        alert("(-)없이 전화번호를 입력하세요. (예: 01012345678)");
      }
    } else if (name === "phone" && contactMethod === "insta") {
      if (/^[a-z0-9_.]{0,30}$/.test(value)) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      } else {
        alert("인스타 아이디는 영어,숫자,언더바(_),마침표(.)만 가능합니다.");
      }
    } else if (name === "song") {
      if (/^[^?~!@#$%^&*()+'"<>\\/|{}[\]_=;:]{0,30}$/.test(value)) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      } else {
        alert("노래에는 특수기호를 쓸수 없습니다");
      }
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
>>>>>>> 294ab0b45cc25d50643e1ff619fda3c3155381a6
    }
  };

  const handleContactMethod = (method) => {
    setContactMethod(method);
  };

  const handleGenderSelection = (value) => {
<<<<<<< HEAD
    setUser((prevUser) => ({
      ...prevUser,
      gender: value === "male" ? true : false,
    }));
=======
    setFormData({
      ...formData,
      gender: value === "male" ? true : false,
    });
>>>>>>> 294ab0b45cc25d50643e1ff619fda3c3155381a6
  };

  const handleMBTISelection = (value) => {
    const category =
      value === "E" || value === "I"
        ? "EI"
        : value === "S" || value === "N"
        ? "SN"
        : value === "T" || value === "F"
        ? "TF"
        : "PJ";

    // Update the corresponding state variable with the selected value
<<<<<<< HEAD
    setSelectedMBTI((prevMBTI) => ({
      ...prevMBTI,
      [category]: value,
    }));
    // Update formData's mbti with the selected preferences
    setUser((prevUser) => ({
      ...prevUser,
      mbti: `${category === "EI" ? value : selectedMBTI.EI}${
        category === "SN" ? value : selectedMBTI.SN
      }${category === "TF" ? value : selectedMBTI.TF}${
        category === "PJ" ? value : selectedMBTI.PJ
=======
    if (category === "EI") {
      setSelectedEI(value);
    } else if (category === "SN") {
      setSelectedSN(value);
    } else if (category === "TF") {
      setSelectedTF(value);
    } else if (category === "PJ") {
      setSelectedPJ(value);
    }

    // Update formData's mbti with the selected preferences
    setFormData((prevFormData) => ({
      ...prevFormData,
      mbti: `${category === "EI" ? value : selectedEI}${
        category === "SN" ? value : selectedSN
      }${category === "TF" ? value : selectedTF}${
        category === "PJ" ? value : selectedPJ
>>>>>>> 294ab0b45cc25d50643e1ff619fda3c3155381a6
      }`,
    }));
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setSelectedMajor("");
<<<<<<< HEAD
    setUser((prevUser) => ({
      ...prevUser,
      depart: e.target.value,
    }));
=======
    setFormData({
      ...formData,
      depart: e.target.value,
    });
>>>>>>> 294ab0b45cc25d50643e1ff619fda3c3155381a6
  };

  const handleMajorChange = (e) => {
    setSelectedMajor(e.target.value);
<<<<<<< HEAD
    setUser((prevUser) => ({
      ...prevUser,
      depart: e.target.value,
    }));
=======
    setFormData({
      ...formData,
      depart: e.target.value,
    });
>>>>>>> 294ab0b45cc25d50643e1ff619fda3c3155381a6
  };

  const checkIfExists = async () => {
    const response = await axios.get(
<<<<<<< HEAD
      `https://onesons.site/register?phone=${user.phone}`
=======
      `https://onesons.site/register?phone=${formData.phone}`
>>>>>>> 294ab0b45cc25d50643e1ff619fda3c3155381a6
    );
    return response;
  };

  const handleCheck = async () => {
    const response = await checkIfExists();
    const alreadyExists = response.data;
<<<<<<< HEAD
    console.log(response.data);
    console.log(alreadyExists);
    if (alreadyExists) {
      alert(
        `1이미 존재하는 ${
=======
    if (alreadyExists) {
      alert(
        `이미 존재하는 ${
>>>>>>> 294ab0b45cc25d50643e1ff619fda3c3155381a6
          contactMethod === "phone" ? "전화번호" : "인스타그램 ID"
        }입니다.`
      );
    } else {
      alert(
<<<<<<< HEAD
        `2입력한 ${
=======
        `입력한 ${
>>>>>>> 294ab0b45cc25d50643e1ff619fda3c3155381a6
          contactMethod === "phone" ? "전화번호" : "인스타그램 ID"
        }는 사용 가능합니다.`
      );
      setIsContactVerified(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD

    if (!validateForm(user, selectedMajor, contactMethod, isContactVerified)) {
      return;
    }

    const yearAsInt = parseInt(user.year, 10);
    const formDataWithIntYear = {
      ...user,
=======
    const yearAsInt = parseInt(formData.year, 10);
    if (!formData.depart || !selectedMajor) {
      alert("학과와 전공을 선택하세요.");
      return;
    }
    if (!/^\d{11}$/.test(formData.phone) && contactMethod === "phone") {
      alert("전화번호는 11자리를 입력해주세요");
      return;
    }
    // Check if the conversion was successful
    if (isNaN(yearAsInt)) {
      alert("올바른 학번을 입력해주세요 (1부터 23까지 가능).");
      return;
    }

    if (yearAsInt < 0 || yearAsInt > 23) {
      alert("올바른 학번을 입력해주세요 (1부터 23까지 가능).");
      return;
    }
    if (formData.song.length > 30 || formData.song.length < 1) {
      alert("최대 30자 이내로 좋아하는 노래를 입력해주세요.");
      return;
    }
    if (formData.mbti.length !== 4) {
      alert("MBTI를 모두 선택해주세요.");
      return;
    }
    if (isContactVerified === false) {
      alert("전화번호 확인버튼을 눌러주세요!");
      return;
    }
    const formDataWithIntYear = {
      ...formData,
>>>>>>> 294ab0b45cc25d50643e1ff619fda3c3155381a6
      year: yearAsInt,
    };

    try {
      const response = await axios.post(
        "https://onesons.site/register",
        formDataWithIntYear
      );
<<<<<<< HEAD

      if (response.data.isSuccess === true) {
        setUser((prevUser) => ({ ...prevUser, isLoggedIn: true }));
        navigate("/");
      } else {
        alert(response.data.message);
=======
      const generatedPassword = response.data.result.passwd;
      const generatedSuccess = response.data.isSuccess;
      const generatedMessage = response.data.message;
      if (generatedSuccess === true) {
        navigate("/Complete", { state: { generatedPassword } });
      } else {
        alert(generatedMessage);

        return;
>>>>>>> 294ab0b45cc25d50643e1ff619fda3c3155381a6
      }
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
<<<<<<< HEAD
        <ComatHeader destination="/" buttonText="처음으로" />
        <div className="content">
          <div onSubmit={handleSubmit} style={{ display: "flex" }}>
            <div className="depart">
              <label>
                <h3>학과</h3>
              </label>
              <label className="depart-select">
=======
        <div className="header">
          <div>
            <img
              src={process.env.PUBLIC_URL + `assets/logowhite.png`}
              alt="로고"
              style={{ width: "142px", height: "auto", marginLeft: "24px" }}
              onClick={() => navigate("/")}
            />
          </div>
          <button
            className="look-button"
            style={{
              width: "98px",
              height: "29px",
              marginRight: "24px",
              borderRadius: "15px",
              textAlign: "center",
              color: "#ffffff",
              fontSize: "16px",
              fontWeight: "bold",
              paddingTop: "4px",
            }}
            onClick={() => navigate("/Error")}
          >
            조회하기
          </button>
        </div>
        <div className="content">
          <div onSubmit={handleSubmit} style={{ display: "flex" }}>
            <div style={{ marginRight: "13px" }}>
              <label>
                <h4>학과</h4>
              </label>
              <label>
>>>>>>> 294ab0b45cc25d50643e1ff619fda3c3155381a6
                <select
                  name="depart"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
<<<<<<< HEAD
                  <option value="" style={{ paddingRight: "15px" }} disabled>
=======
                  <option value="" disabled>
>>>>>>> 294ab0b45cc25d50643e1ff619fda3c3155381a6
                    선택
                  </option>
                  {majorCategories.map((category) => (
                    <option key={category.label} value={category.label}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

<<<<<<< HEAD
            <div className="major">
              <label>
                <h3 class="major">전공</h3>
              </label>
              <label className="major-select">
=======
            <div>
              <label>
                <h4 class="major">전공</h4>
>>>>>>> 294ab0b45cc25d50643e1ff619fda3c3155381a6
                <select
                  name="major"
                  value={selectedMajor}
                  onChange={handleMajorChange}
                >
                  <option value="" disabled>
                    선택
                  </option>
                  {selectedCategory &&
                    majorCategories
                      .find((category) => category.label === selectedCategory)
                      .options.map((major) => (
                        <option key={major} value={major}>
                          {major}
                        </option>
                      ))}
                </select>
              </label>
            </div>
          </div>
          <div>
            <label>
<<<<<<< HEAD
              <h3>학번</h3>
              <MyInput
                name="year"
                value={user.year}
                onChange={handleChange}
=======
              <h4>학번</h4>
              <input
                type="text"
                name="year"
                value={formData.year}
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
>>>>>>> 294ab0b45cc25d50643e1ff619fda3c3155381a6
                placeholder="00학번부터 23학번까지 가능합니다 ex)23"
              />
            </label>
          </div>
          <div className="contact-method">
            <label>
<<<<<<< HEAD
              <h3 class="phone">연락처</h3>
              <div className="space">&nbsp;</div>
              <button
                type="button"
                className="phonebutton"
                onClick={() => handleContactMethod("phone")}
=======
              <h4 class="phone">연락처</h4>
              <div className="space">&nbsp;</div>
              <button
                type="button"
                class="phonebutton"
                onClick={() => handleContactMethod("phone")}
                style={{
                  backgroundColor:
                    contactMethod === "phone" ? "#ff775e" : "#ffffff",
                  border:
                    contactMethod === "phone" ? "none" : "2px solid #e0e0e0",
                  marginTop: "17px",
                  marginRight: "6px",
                }}
>>>>>>> 294ab0b45cc25d50643e1ff619fda3c3155381a6
              >
                <img
                  src={process.env.PUBLIC_URL + `assets/phone.png`}
                  alt="전화번호"
                  style={{
<<<<<<< HEAD
                    width: "13px",
                    height: "13px",
=======
                    width: "12px",
                    height: "12px",
>>>>>>> 294ab0b45cc25d50643e1ff619fda3c3155381a6
                  }}
                />
              </button>
              <button
                type="button"
<<<<<<< HEAD
                className="phonebutton"
                onClick={() => handleContactMethod("insta")}
=======
                class="phonebutton"
                onClick={() => handleContactMethod("insta")}
                style={{
                  backgroundColor:
                    contactMethod === "insta" ? "#ff775e" : "#ffffff",
                  border:
                    contactMethod === "insta" ? "none" : "2px solid #e0e0e0",
                  marginTop: "17px",
                  marginRight: "14px",
                }}
>>>>>>> 294ab0b45cc25d50643e1ff619fda3c3155381a6
              >
                <img
                  src={process.env.PUBLIC_URL + `assets/insta.png`}
                  alt="insta"
                  style={{
                    width: "16px",
                    height: "16px",
                    marginTop: "-3px",
                  }}
                />
              </button>
            </label>
            <div className="contact-input">
              {contactMethod === "phone" ? (
                <label>
<<<<<<< HEAD
                  <MyInput
                    name="phone"
                    value={user.phone}
                    onChange={handleChange}
=======
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                      }
                    }}
>>>>>>> 294ab0b45cc25d50643e1ff619fda3c3155381a6
                    placeholder="ex)01012345678"
                  />
                  <button
                    type="button"
                    class="checkbutton"
                    onClick={handleCheck}
                  >
                    확인
                  </button>
                </label>
              ) : (
                <label>
<<<<<<< HEAD
                  <MyInput
                    name="phone"
                    value={user.phone}
                    onChange={handleChange}
=======
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                      }
                    }}
>>>>>>> 294ab0b45cc25d50643e1ff619fda3c3155381a6
                    placeholder="ex)cuk_coma (@는 빼고 넣어주세요)"
                  />
                  <button
                    type="button"
                    class="checkbutton"
                    onClick={handleCheck}
                  >
                    확인
                  </button>
                </label>
              )}
            </div>
          </div>
<<<<<<< HEAD
          <h6 className={`check-message ${isContactVerified ? "hidden" : ""}`}>
=======
          <h6
            style={{
              textAlign: "left",
              marginLeft: "19px",
              marginTop: "5px",
              color: "red",
              display: isContactVerified ? "none" : "block",
            }}
          >
>>>>>>> 294ab0b45cc25d50643e1ff619fda3c3155381a6
            중복입력 방지를 위해 확인버튼을 눌러주세요
          </h6>
          <div>
            <label>
<<<<<<< HEAD
              <h3>좋아하는 노래</h3>
              <MyInput
                name="song"
                value={user.song}
                onChange={handleChange}
                placeholder="ex)antifreeze"
                className="song-input"
=======
              <h4>좋아하는 노래</h4>
              <input
                type="text"
                name="song"
                value={formData.song}
                onChange={handleChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
                placeholder="ex)antifreeze"
>>>>>>> 294ab0b45cc25d50643e1ff619fda3c3155381a6
              />
            </label>
          </div>
          <div>
            <label>
<<<<<<< HEAD
              <h3>성별</h3>
              <div className="gender-button-container">
                <GenderButton
                  isActive={user.gender}
                  value="male"
                  onClick={handleGenderSelection}
                  label="남자"
                  className="gender-button"
                />
                <GenderButton
                  isActive={!user.gender}
                  value="female"
                  onClick={handleGenderSelection}
                  label="여자"
                  className="gender-button"
                />
              </div>
=======
              <h4>성별</h4>
              <button
                type="button"
                class="genderbutton"
                value="male"
                onClick={() => handleGenderSelection("male")}
                style={{
                  backgroundColor: formData.gender ? "#ff775e" : "#ffffff",
                  color: formData.gender ? "#ffffff" : "#A5A5A5",
                  border: formData.gender ? "none" : "2px solid #e0e0e0",
                }}
              >
                남자
              </button>
              <button
                type="button"
                class="genderbutton"
                value="female"
                onClick={() => handleGenderSelection("female")}
                style={{
                  backgroundColor: formData.gender ? "#ffffff" : "#ff775e",
                  color: formData.gender ? "#A5A5A5" : "#ffffff",
                  border: formData.gender ? "2px solid #e0e0e0" : "none",
                }}
              >
                여자
              </button>
>>>>>>> 294ab0b45cc25d50643e1ff619fda3c3155381a6
            </label>
          </div>
          <div className="mbtidiv">
            <label>
<<<<<<< HEAD
              <h3>MBTI</h3>
              <div className="mbtibutton-container">
                {/* 첫 번째 열 */}
                <div className="mbtibutton-column">
                  <MBTIButton
                    isActive={user.mbti.includes("E")}
                    onClick={() => handleMBTISelection("E")}
                    label="E"
                    className="mbtibutton"
                  />
                  <MBTIButton
                    isActive={user.mbti.includes("I")}
                    onClick={() => handleMBTISelection("I")}
                    label="I"
                    className="mbtibutton"
                  />
                </div>

                {/* 두 번째 열 */}
                <div className="mbtibutton-column">
                  <MBTIButton
                    isActive={user.mbti.includes("N")}
                    onClick={() => handleMBTISelection("N")}
                    label="N"
                    className="mbtibutton"
                  />
                  <MBTIButton
                    isActive={user.mbti.includes("S")}
                    onClick={() => handleMBTISelection("S")}
                    label="S"
                    className="mbtibutton"
                  />
                </div>

                {/* 세 번째 열 */}
                <div className="mbtibutton-column">
                  <MBTIButton
                    isActive={user.mbti.includes("T")}
                    onClick={() => handleMBTISelection("T")}
                    label="T"
                    className="mbtibutton"
                  />
                  <MBTIButton
                    isActive={user.mbti.includes("F")}
                    onClick={() => handleMBTISelection("F")}
                    label="F"
                    className="mbtibutton"
                  />
                </div>

                {/* 네 번째 열 */}
                <div className="mbtibutton-column">
                  <MBTIButton
                    isActive={user.mbti.includes("P")}
                    onClick={() => handleMBTISelection("P")}
                    label="P"
                    className="mbtibutton"
                  />
                  <MBTIButton
                    isActive={user.mbti.includes("J")}
                    onClick={() => handleMBTISelection("J")}
                    label="J"
                    className="mbtibutton"
                  />
=======
              <h4>MBTI</h4>
              <div style={{ display: "flex" }}>
                <div>
                  <button
                    type="button"
                    class="mbtibutton"
                    onClick={() => handleMBTISelection("E")}
                    style={{
                      backgroundColor: formData.mbti.includes("E")
                        ? "#ff775e"
                        : "#ffffff",
                      color: formData.mbti.includes("E")
                        ? "#ffffff"
                        : "#A5A5A5",
                      border: formData.mbti.includes("E")
                        ? "none"
                        : "2px solid #e0e0e0",
                      marginBottom: "10px",
                    }}
                  >
                    E
                  </button>
                  <button
                    type="button"
                    class="mbtibutton"
                    onClick={() => handleMBTISelection("I")}
                    style={{
                      backgroundColor: formData.mbti.includes("I")
                        ? "#ff775e"
                        : "#ffffff",
                      color: formData.mbti.includes("I")
                        ? "#ffffff"
                        : "#A5A5A5",
                      border: formData.mbti.includes("I")
                        ? "none"
                        : "2px solid #e0e0e0",
                    }}
                  >
                    I
                  </button>
                </div>

                {/* 두 번째 열 */}
                <div>
                  <button
                    type="button"
                    class="mbtibutton"
                    onClick={() => handleMBTISelection("N")}
                    style={{
                      backgroundColor: formData.mbti.includes("N")
                        ? "#ff775e"
                        : "#ffffff",
                      color: formData.mbti.includes("N")
                        ? "#ffffff"
                        : "#A5A5A5",
                      border: formData.mbti.includes("N")
                        ? "none"
                        : "2px solid #e0e0e0",
                      marginBottom: "10px",
                    }}
                  >
                    N
                  </button>
                  <button
                    type="button"
                    class="mbtibutton"
                    onClick={() => handleMBTISelection("S")}
                    style={{
                      backgroundColor: formData.mbti.includes("S")
                        ? "#ff775e"
                        : "#ffffff",
                      color: formData.mbti.includes("S")
                        ? "#ffffff"
                        : "#A5A5A5",
                      border: formData.mbti.includes("S")
                        ? "none"
                        : "2px solid #e0e0e0",
                    }}
                  >
                    S
                  </button>
                </div>

                {/* 세 번째 열 */}
                <div>
                  <button
                    type="button"
                    class="mbtibutton"
                    onClick={() => handleMBTISelection("T")}
                    style={{
                      backgroundColor: formData.mbti.includes("T")
                        ? "#ff775e"
                        : "#ffffff",
                      color: formData.mbti.includes("T")
                        ? "#ffffff"
                        : "#A5A5A5",
                      border: formData.mbti.includes("T")
                        ? "none"
                        : "2px solid #e0e0e0",
                      marginBottom: "10px",
                    }}
                  >
                    T
                  </button>
                  <button
                    type="button"
                    class="mbtibutton"
                    onClick={() => handleMBTISelection("F")}
                    style={{
                      backgroundColor: formData.mbti.includes("F")
                        ? "#ff775e"
                        : "#ffffff",
                      color: formData.mbti.includes("F")
                        ? "#ffffff"
                        : "#A5A5A5",
                      border: formData.mbti.includes("F")
                        ? "none"
                        : "2px solid #e0e0e0",
                    }}
                  >
                    F
                  </button>
                </div>

                {/* 네 번째 열 */}
                <div>
                  <button
                    type="button"
                    class="mbtibutton"
                    onClick={() => handleMBTISelection("P")}
                    style={{
                      backgroundColor: formData.mbti.includes("P")
                        ? "#ff775e"
                        : "#ffffff",
                      color: formData.mbti.includes("P")
                        ? "#ffffff"
                        : "#A5A5A5",
                      border: formData.mbti.includes("P")
                        ? "none"
                        : "2px solid #e0e0e0",
                      marginBottom: "10px",
                    }}
                  >
                    P
                  </button>
                  <button
                    type="button"
                    class="mbtibutton"
                    onClick={() => handleMBTISelection("J")}
                    style={{
                      backgroundColor: formData.mbti.includes("J")
                        ? "#ff775e"
                        : "#ffffff",
                      color: formData.mbti.includes("J")
                        ? "#ffffff"
                        : "#A5A5A5",
                      border: formData.mbti.includes("J")
                        ? "none"
                        : "2px solid #e0e0e0",
                    }}
                  >
                    J
                  </button>
>>>>>>> 294ab0b45cc25d50643e1ff619fda3c3155381a6
                </div>
              </div>
            </label>
          </div>
<<<<<<< HEAD
          {/* <button type="submit-button" disabled={!isContactVerified}> */}
          <button type="submit-button">매칭 등록(Click) ▶</button>
=======
          <button type="submit-button" disabled={!isContactVerified}>
            매칭 등록(Click) ▶
          </button>
>>>>>>> 294ab0b45cc25d50643e1ff619fda3c3155381a6
        </div>
      </form>
    </div>
  );
}

export default Form;
