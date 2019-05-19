## REST Countries

국가 정보를 받아와 리스팅해주는 간단한 리액트 페이지입니다.

![Imgur](https://i.imgur.com/zbFo03O.png)

## Data

https://restcountries.eu/rest/v2/all?fields=alpha2Code;capital;name;region;callingCodes

## 구성

- react, webpack4, babel7, typescript를 베이스로 사용하여 개발
- 버튼을 누르면 각 필드별 오름차순, 내림차순 정렬이 되어야 함.
- 검색 창이 있어 통합 검색이 되어야 함. (Case insensitive, 부분일치)
- 각 나라의 데이터 Row에 삭제 버튼이 있어 누르면 삭제되어야 함.
- 나라 정보를 입력해서 Row를 추가할 수 있어야 함.
- 모든 상태(나라 목록, 정렬 상태, 검색어 등)는 데이터 관리 라이브러리(Redux, MobX 등)에 저장되어야 함.
- Network 통신은 redux middleware를 통해 되어야 함.
- 일부만 로딩 후 스크롤 아래로 갈 시 추가 로딩
- cross browsing 적용
- 검색 기능 (Rate limiting(debounce, throttle) 적용하여 타이핑 시 바로 검색)
- 새로운 나라 데이터 추가의 경우 `country`, `capital`, `region`, `alpha2code`, `callingCode` 다섯 가지 속성을 전부 입력해야 추가할 수 있습니다. 입력하지 않은 속성이 있을 경우 인풋 박스가 붉은색으로 변합니다, 중복되는 이름의 국가가 존재할 경우에도 나라 이름 박스가 붉은색으로 변하며 추가되지 않습니다.
- scroll을 통한 lazy loaded data의 양은 횟수당 50개입니다. 초기에는 50개의 데이터만 보여집니다. throttle을 적용했습니다. 검색에는 debounce가 적용되어 있습니다.
- reset 버튼은, 데이터를 초기 로드 상태로 완전히 되돌립니다. 삭제된 데이터는 다시 생기고 새로 추가한 데이터는 사라집니다. 정렬 기준, 검색어 또한 초기화됩니다. 새로고침이나 재접속 시에도 같은 효과가 나타납니다.
- 서치 박스 내에서 엔터 입력 시에도 서치 함수가 실행되도록 추가했습니다.
- gun svg 아이콘에 lazy-load 적용했던 것을 취소했습니다.
- scroll을 통한 load에 throttle을 적용했습니다.
- https://naranara.net 의 주소로 접속하실 수 있습니다.

## 스펙
- babel 7
- babel-loader (able to load typescript without ts-loader)
- webpack 4
- typescript
- eslint
- redux
- redux-thunk
- redux-logger
- reselect
- lodash.debounce
- lodash.throttle
- sass-loader
- ...
