import { Helmet, HelmetProvider } from "react-helmet-async";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { getMovies, IGetMoviesResult } from "../../Api/api";
import Loading from "../../Styles/Loading";

const Body = styled.div`
  font-family: "Raleway Sans";
  min-width: 1024px;
  max-height: 100%;
  word-break: keep-all;
  @media screen and (max-width: 1023px) {
  }
`;
const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  background-image: url("https://assets.nflxext.com/ffe/siteui/vlv3/ed0b5df9-ba9d-4534-bd09-57993daeda56/ad1fd8bb-8268-44ae-bfca-3da8cfc5726f/KR-en-20220214-popsignuptwoweeks-perspective_alpha_website_large.jpg");
  background-repeat: no-repeat;
  background-size: cover; ;
`;

const MainOpacity = styled.div`
  background: linear-gradient(
    rgba(0, 0, 0, 0.8),
    rgba(0, 0, 0, 0.3),
    rgba(0, 0, 0, 0.8)
  );
`;

const MainHeader = styled.div`
  width: 100%;
  height: 150px;
  position: relative;
  display: flex;
  z-index: 10;
  @media screen and (max-width: 1280px) {
    align-items: center;
    height: 100px;
  }
`;
const Headwrapper = styled.div`
  width: 98%;
  height: 100px;
  position: absolute;
  display: flex;
  justify-content: space-between;
`;
//logo box 변경하기
const LogoBox = styled.div`
  width: 15rem;
  height: 80px;
  margin: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    font-size: 40px;
    font-weight: 600;
  }
  a {
    color: red;
  }
`;

const LoginBtnBox = styled.div`
  width: 10rem;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LoginBox = styled.div`
  width: 100px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  button {
    cursor: pointer;
    width: 100px;
    height: 40px;
    font-size: 18px;
    border-radius: 5px;
    background-color: red;
    color: white;
    text-align: center;
  }
  a {
    border: none;
    margin: 0;
    padding: 0;
  }
  @media screen and (max-width: 1280px) {
    button {
      width: 80px;
      font-size: 16px;
    }
  }
`;

const SectionWrapper = styled.div`
  width: 100%;
  height: 65vh;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 8px solid #222;
  position: relative;
  z-index: 3000;
  @media screen and (max-width: 1280px) {
    height: 75vh;
  }
`;
const SectionContainer = styled.div`
  min-width: 700px;
  height: 40vh;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  h1 {
    font-size: 60px;
    font-weight: 600;
    text-align: center;
  }
  h4 {
    text-align: center;
    font-size: 23px;
  }
  @media screen and (max-width: 1280px) {
    h1 {
      font-size: 50px;
    }
    h4 {
      font-size: 18px;
    }
  }
`;

const SectionBtnContainer = styled.div`
  width: 300px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 1280px) {
    width: 200px;
    height: 60px;
  }
`;
const SectionBtnBox = styled(Link)`
  width: 80%;
  height: 80%;
  font-size: 35px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: red;
`;
const SectionBtn = styled.span``;

const PlayContainer = styled.div`
  width: 100%;
  height: 50%;
  padding: 70px 45px;
  border-bottom: 8px solid #222;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const PlayBox = styled.div`
  width: 80%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextContainer = styled.div`
  min-width: 650px;
  display: flex;
  align-items: center;
  justify-content: center;
  h1 {
    font-size: 60px;
    font-weight: 600;
    padding-bottom: 20px;
  }
  h4 {
    font-size: 23px;
  }
`;

const VideoContainer = styled.div`
  min-width: 400px;
  max-height: 100%;
  position: relative;
  overflow: hidden;
`;

const VideoImg = styled.img`
  max-width: 100%;
  max-height: 100%;
  border: 0;
  position: relative;
  z-index: 2;
`;

const VideoWrapper = styled.div`
  width: 100%;
  height: 100%;
  max-width: 73%;
  max-height: 30%;
  position: absolute;
  top: 34%;
  left: 48%;
  transform: translate(-50%, -50%);
`;

const SecondVideoWrapper = styled.div`
  width: 100%;
  height: 100%;
  max-width: 63%;
  max-height: 47%;
  position: absolute;
  top: 34%;
  left: 50%;
  transform: translate(-50%, -50%);
  video {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;

const Home = () => {
  const { isLoading, data } = useQuery<IGetMoviesResult>(["start"], getMovies);
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <Body>
          <HelmetProvider>
            <Helmet>
              <title>Seungflix</title>
            </Helmet>
          </HelmetProvider>
          <MainContainer>
            <MainOpacity>
              <MainHeader>
                <Headwrapper>
                  <LogoBox>
                    <span>
                      <a href="https://github.com/parkingbox/SEUNGFLIX">
                        SEUNGFLIX
                      </a>
                    </span>
                  </LogoBox>
                  <LoginBtnBox>
                    <LoginBox>
                      <a href="https://www.netflix.com/kr/login">
                        <button>로그인</button>
                      </a>
                    </LoginBox>
                  </LoginBtnBox>
                </Headwrapper>
              </MainHeader>
              <SectionWrapper>
                <SectionContainer>
                  <h1>
                    영화와 시리즈를 <br /> 무제한으로.
                  </h1>
                  <h4>
                    다양한 디바이스에서 시청하세요. Seungflix는 다 가능합니다.
                  </h4>
                  <SectionBtnContainer>
                    <SectionBtnBox to="/movies">
                      <SectionBtn>시작하기</SectionBtn>
                    </SectionBtnBox>
                  </SectionBtnContainer>
                </SectionContainer>
              </SectionWrapper>
            </MainOpacity>
          </MainContainer>
          <PlayContainer>
            <PlayBox>
              <TextContainer>
                <div>
                  <h1>TV로 즐기세요.</h1>
                  <h4>
                    스마트 TV, PlayStation, Xbox, Chromecast,
                    <br /> Apple TV, 블루레이 플레이어 등 다양한
                    <br /> 디바이스에서 시청하세요.
                  </h4>
                </div>
              </TextContainer>
              <VideoContainer>
                <VideoImg
                  alt=""
                  src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/tv.png"
                  data-uia="our-story-card-img"
                />
                <VideoWrapper>
                  <video autoPlay playsInline muted loop>
                    <source
                      src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-tv-0819.m4v"
                      type="video/mp4"
                    />
                  </video>
                </VideoWrapper>
              </VideoContainer>
            </PlayBox>
          </PlayContainer>
          <PlayContainer>
            <PlayBox>
              <VideoContainer>
                <img
                  alt=""
                  src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/mobile-0819.jpg"
                  data-uia="our-story-card-img"
                />
              </VideoContainer>
              <TextContainer>
                <div>
                  <h1>
                    즐겨 보는 콘텐츠를
                    <br /> 저장해 오프라인으로 <br />
                    시청하세요.
                  </h1>
                  <h4>간편하게 저장하고 빈틈없이 즐겨보세요.</h4>
                </div>
              </TextContainer>
            </PlayBox>
          </PlayContainer>
          <PlayContainer>
            <PlayBox>
              <TextContainer>
                <div>
                  <h1>
                    다양한 디바이스에서
                    <br /> 시청하세요
                  </h1>
                  <h4>
                    각종 영화와 시리즈를 스마트폰, 태블릿,
                    <br /> 노트북, TV에서 무제한으로
                    <br /> 스트리밍하세요. 추가 요금이 전혀
                    <br /> 없습니다.
                  </h4>
                </div>
              </TextContainer>
              <VideoContainer>
                <VideoImg
                  alt=""
                  src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/device-pile.png"
                  data-uia="our-story-card-img"
                />
                <SecondVideoWrapper>
                  <video autoPlay playsInline muted loop>
                    <source
                      src="https://assets.nflxext.com/ffe/siteui/acquisition/ourStory/fuji/desktop/video-devices.m4v"
                      type="video/mp4"
                    />
                  </video>
                </SecondVideoWrapper>
              </VideoContainer>
            </PlayBox>
          </PlayContainer>
          <PlayContainer>
            <PlayBox>
              <VideoContainer>
                <img
                  alt=""
                  src="https://occ-0-988-325.1.nflxso.net/dnm/api/v6/19OhWN2dO19C9txTON9tvTFtefw/AAAABdFTpLmANuJpYneLq8L5m7CunMCi8e8Nl4y7xaPVWzG3IeoDoq17egTQAthApKg_4sdRWdwuR8KadWu1frjL3JQImpwq.png?r=fcd"
                  data-uia="our-story-card-img"
                />
              </VideoContainer>
              <TextContainer>
                <div>
                  <h1>
                    어린이 전용 프로필을
                    <br /> 만들어 보세요
                  </h1>
                  <h4>
                    자기만의 공간에서 좋아하는 캐릭터와
                    <br />즐기는 신나는 모험. 자녀에게 이 특별한 경험을 선물하세요
                    <br />넷플릭스 회원이라면 무료입니다.
                  </h4>
                </div>
              </TextContainer>
            </PlayBox>
          </PlayContainer>
        </Body>
      )}
    </>
  );
};
export default Home;
