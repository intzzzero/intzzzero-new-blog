---
title: "React TIL 05"
date: "2020-06-09"
update: "2020-06-09"
draft: false
category: "React"
path: "/blog/react-til-05"
---

## React TIL 05
- 내가 필요한 Movie List의 경로는 `movies.data.data.movies`이기 때문에 아래와 같이 단축표현으로 쓰면 좋음.
- `setState`에서 `movies: movies`로 key와 value의 이름이 같을 때에는 아래와 같이 하나만 써도 됨.

```js
  getMovies = async () => {
    const {data: {data: { movies }}} = await axios.get('https://yts.lt/api/v2/list_movies.json'); 
    this.setState({ movies, isLoading: false })
  }
```

- class형 모듈이 여러모로 할 수 있는 게 많지만, state가 필요하지 않다던가 하는 경우에는 굳이 class형 모듈을 쓰지 않고, 간단하게 함수형 모듈을 사용해도 좋음.
- 아래와 같이 api에 정해진 파라미터가 있으니 잘 살펴볼 것
![](https://github.com/codeAmeba/amebalab/blob/master/src/images/api.png?raw=true)

- 받아온 Movies를 `map()`메서드로 렌더링
- key 빼먹으면 에러 남

```js
  render() {
    const { isLoading, movies } = this.state;
    return (
      <div>{isLoading ? 'Loading...' : movies.map(movie => {
      return <Movie 
        key={movie.id}
        id={movie.id} 
        year={movie.year} 
        title={movie.title} 
        summary={movie.summary} 
        poster={movie.medium_cover_image} 
        />
      })}</div>
    );
  }
```