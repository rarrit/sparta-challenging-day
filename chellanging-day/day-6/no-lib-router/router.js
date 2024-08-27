export default function createRouter() {
  const routes = []; // 애플리케이션의 경로 목록들을 담을 배열이다. 클로저를 이용하여 데이터를 추가한다.
  const ROUTE_PARAMETER_REGEXP = /:(\w+)/g // :name, :song등 path parameters를 매칭하기 위한 정규표현식
  const URL_REGEXP = '([^\\/]+)'

  const router = {
    // 라우터 기능 1. 애플리케이션의 경로 목록들을 저장한다.
    addRoute(fragment, component) {
      const params = [];
      const parsedFragment = fragment.replace(ROUTE_PARAMETER_REGEXP, (_, paramName) => {
        params.push(paramName); // path parameter 이름을 추출하여 배열에 넣어줍니다. ["name", "song"]
        return URL_REGEXP; // path parameter에 매치되는 문자를 URL_REGEXP로 치환합니다.
      }).replace(/\//g, "\\/"); // "/" 의 텍스트로써 사용을 위해 모든 "/" 앞에 이스케이프 문자("\")를 추가해줍니다.

      routes.push({
        fragmentRegExp: new RegExp(`^${parsedFragment}$`),
        component,
        params,
      });

      return this;
    },
    navigate(fragment, replace = false) {
      if (replace) {
        const href = window.location.href.replace(window.location.hash, "#" + fragment);
        window.location.replace(href);
      } else {
        console.log("window.location.hash =>", window.location.hash);
        window.location.hash = fragment;
      }
    },
    // 라우터 기능 2. 현재 URL이 변경되면 페이지 콘텐츠를 해당 URL에 매핑된 구성 요소로 교체한다.
    start() {
      // routes 배열에서 현재 브라우저 hash값과 동일한 해시값을 가진 구성 요소를 찾는다.
      const getUrlParams = (route, hash) => {
        const params = {};
        const matches = hash.match(route.fragmentRegExp);

        matches.shift(); // 배열의 첫번째 값에는 url 전체가 담겨있으므로 제거해준다.
        matches.forEach((paramValue, index) => {
          const paramName = route.params[index];
          params[paramName] = paramValue;
        });
        // params = {name: 'IU', song: 'raindrop'}
        return params;
      };

      const checkRoutes = () => {
        const currentRoute = routes.find(route =>
          route.fragmentRegExp.test(window.location.hash));

        if (currentRoute.params.length) {
          // path parameters가 있는 url인 경우
          const urlParams = getUrlParams(currentRoute, window.location.hash)
          currentRoute.component(urlParams);
        } else {
          currentRoute.component();
        }

      };

      window.addEventListener('hashchange', checkRoutes); // 브라우저에서 hash값이 바뀔때 발생하는 이벤트.
      checkRoutes();

    }
  };

  return router;
}