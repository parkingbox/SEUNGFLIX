![rounded](https://capsule-render.vercel.app/api?type=rounded&color=timeAuto&text=SEUNGFLIX&fontAlignY=50&fontSize=80&height=200&stroke=000000&strokeWidth=2)

<div align='center'>

### 넷플릭스 클론 코딩

<br/>

[-->🏠<--](https://parkingbox.github.io/SEUNGFLIX/)

  <img src='https://img.shields.io/badge/React-v18.2.0-blue?logo=React'/>
  <img src="https://img.shields.io/badge/ReactRouter-v6.4.2-CA4245??style=flat-square&logo=React Router&logoColor=#CA4245" alt="react-router badge" />
  <img src="https://img.shields.io/badge/StyledComponents-5.3.6-DB7093??style=flat-square&logo=styled-components&logoColor=#DB7093" alt="styled-components badge" />
  <img src="https://img.shields.io/badge/Framer-7.3.1-DB7093??style=flat-square&logo=Framer&logoColor=#0055FF" alt="Framer badge" />
  <img src="https://img.shields.io/badge/-React--hook--form--7.38.0-purple" />
  <img src="https://img.shields.io/badge/-React--player--2.11.0-purple" />
  <img src="https://img.shields.io/badge/-react--query--1.2.9-purple" />
  <img src="https://img.shields.io/badge/-Recoil--0.7.6-purple"/>
</div>

# Description
> 2022. 11 ~ 2022. 12
React 및 TypeScript를 활용하여 나만의 Netflix 구현

## Overview
---
<br/>

### Home

<img src='https://user-images.githubusercontent.com/85726838/156602223-c39437b2-e3aa-4114-8503-17580bc39511.gif'/>

메인페이지는 넷플릭스와 같은 형태로 만들었습니다.
<br/>
<br/>
<br/>
<br/>

<!-- ### Movies

The Movie Database (TMDB)의 API를 fetching 하여 메인에는 Trending 영화의
제목과 영화설명 그리고 하단 영화의 나열은 Framer-motion을 사용하여 Animation을 주었습니다.
<br />
<br />  
 <br />
<br />

### Movies Detail

<img src='' />
  하단의 영화를 클릭하면 클릭된 영화의 id값을 React-router-dom의 Nested router를 사용하여
  Modal창에 값을 넘겨주고 해당 id값을 바탕으로 값을 받아와 나타나도록 하였습니다.
  <br />
  <br />   
  <br />
  <br />

### Tv

<img src='' />
  Tv의 구조는 Movies와 동일합니다.
  <br />
  <br />   
  <br />
  <br /> 
  
### Tv Detail
<img src='' />
  Tv의 구조는 Movies와 동일합니다.
  <br />
  <br />   
  <br />
  <br /> -->

</div>

```
└─── src
    │    App.tsx
    │    index.tsx
    │    react-app-env.d.ts
    │    theme.ts
    │    styled.d.ts
    │
    ├─── Api
    │        api.ts
    │        utils.ts
    │
    ├─── Components
    │   ├─── Detail
    │   │         MovieDetail.tsx
    │   │         TvDetail.tsx
    │   │         UpcomingDetail.tsx
    │   ├─── Home
    │   │         Home.tsx
    │   │
    │   ├─── Movie
    │   │         Movie.tsx
    │   │
    │   ├─── Search
    │   │         Search.tsx
    │   │
    │   ├─── Tv
    │   │         Tv.tsx
    │   │
    │   └─── Upcoming
    │              Upcoming.tsx
    │
    ├─── Recoil
    │  └───   Atom.ts
    │
    ├─── Routes
    │  ├───   Header.tsx
    │  └───   Router.tsx
    │
    └─── Styles
               Back.tsx
               Error.tsx
               GlobalStyle.ts
               Loading.tsx
               NoResult.tsx
```
