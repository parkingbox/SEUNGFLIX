import { Helmet, HelmetProvider } from "react-helmet-async";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovies, IGetMoviesResult } from "../Api/api";
import Loading from "../Styles/Loading";

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
`
const Headwrapper = styled.div`
  width: 98%;
  height: 100px;
  position: absolute;
  display: flex;
  justify-content: space-between;
`
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
`
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
    border-radius:5px;
    background-color: red;
    color:white;
    text-align: center;
  }
  a {
    border: none;
    margin: 0;
    padding: 0;
  }
  @media screen and (max-width:1280px) {
    button {
      width: 80px;
      font-size: 16px;
    }
  }
`

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
                        Seungflix
                      </a>
                    </span>
                  </LogoBox>
                  <LoginBtnBox>
                    <LoginBox>
                      <a href="https://www.netflix.com/kr/login">
                        <button>Sign in</button>
                      </a>
                    </LoginBox>
                  </LoginBtnBox>
                </Headwrapper>
              </MainHeader>
            </MainOpacity>
          </MainContainer>
        </Body>
      )}
    </>
  );
};
export default Home;
