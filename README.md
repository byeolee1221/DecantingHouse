# Decanting House 프로젝트

## 프로젝트 소개
* 제작 계기: 와인을 주제로 한 커뮤니티가 거의 없는 환경에 아쉬움을 느껴 제작하게 되었습니다.
* 제작 기간: 2023.08.18 ~ 2023.09.13 (25일)
* 제작 인원: 1명 (프론트엔드 - 문창기)
* 멘토링 : 1명 (풀스택 개발자 - 최진태)

## Decanting House 웹사이트가 기여할 수 있는 점
* 국내에서 와인을 좋아하는 사람이라면 누구나 회원가입하여 손쉽게 커뮤니케이션 활동을 할 수 있습니다.
* 국내의 부족한 와인 커뮤니티 공간을 채워서 보완하고, 소규모로 흩어져있던 여러 커뮤니티들을 하나로 합치는 역할을 할 수 있습니다.
* 향후 규모가 커졌을 때, 대한민국 와인커뮤니티를 대표하고, 와인계의 유명인사들과의 collaboration event도 진행하여 세계적으로도 알릴 수 있습니다.

## Architecture
![Alt text](/public/디캔팅하우스.jpg)

## 프로젝트 진행과정에서 생긴 문제와 해결방법
* 문제
  + 소셜로그인 시 사용한 이메일이 같을 때 에러처리가 안됨
* 해결
  + 이메일이 같을 때마다 url에 'error=OAuthAccountNotLinked'를 발견하여 searchParams.get('error') 코드를 사용하여 if문에서 true일 시 socialError 페이지로 가도록 push함.
***
* 문제
  + map 함수를 비동기작업에 대해 실행할 때 데이터가 없는 문제가 발생 
* 해결
  + Promise.all 메서드에 대해 학습하고 적용하여 비동기작업이 완료될 때까지 기다리게 함. 
***  
* 문제
  + 각 국가별 board 컴포넌트에서 7개의 boolean 값의 state를 7개의 함수에서 값을 달리하여 사용함.
* 해결
  + 기본값 카테고리를 정하고 한 개 함수에 category 파라미터를 넣어 7개의 onClick 함수 내에서 파라미터를 달리하여 최적화함. 
*** 
* 문제
  + db에서 직접 가져올 수 없는 client 컴포넌트에서 api로 요청을 할 때 게시글의 id를 가져올 수 없는 문제가 생김.
* 해결
  + 부모 컴포넌트에서 id를 포함한 게시글 정보를 가져와 쓰고 있어서 함수의 파라미터 값으로 id를 전달함.
*** 
* 문제
  + 계정경고에 관한 내용을 useEffect를 이용해 각 게시판에 접속하면 유저에게 알리려 하니 코드가 반복됨.
* 해결
  + 유저가 게시글을 작성할 때마다 경고횟수를 볼 수 있도록 textarea의 placeholder 값에 유저의 reportWarning 값을 띄워줌.
*** 
* 문제
  + 사용자가 검색한 단어를 가지고 게시글을 찾아야하는데 header 컴포넌트에 위치하고 있어 로직을 만들기 어려운 문제가 발생함.
* 해결
  + 별도의 컴포넌트를 만들고 검색단어 state를 header에서 searchPost로 query로 보낸 후 검색 로직을 구현함.
*** 
* 문제
  + 사용자가 누른 좋아요 수가 db까지 갔다가 화면에 표출되고 새로고침하면 1로 변경되는 문제가 발생함.
* 해결
  + 처음엔 reduce 함수를 사용해서 api 내에서 기존의 좋아요 수에 1씩 더해서 db에 저장하여 해결하였고, 이후에 비슷한 로직에서는 mongodb의 inc 명령어를 사용하여 1씩 증가시킴.
*** 
* 문제
  + 페이지네이션을 구현할 때 잘 모르는 구현방법을 써보려다가 구현이 안되는 문제가 발생함.
* 해결
  + useState와 useEffect를 사용하여 page 변경 때마다 api에 요청하여 페이지당 20개의 게시글이 조회되도록 만듦.
*** 
* 문제
  + 게시판에서는 페이지당 20개의 게시글이 나오는데, 20개가 채워지지 않아도 grid 크기에 맞춰 빈 공간이 생김.
* 해결
  + 게시글 공간에 auto-fill 값을 주어 게시글 수가 한 줄씩 늘어날 때마다 점점 아래로 빈 공간이 생기도록 수정함.
*** 