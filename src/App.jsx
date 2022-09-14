import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const [filter, setfilter] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const getTodo = async () => {
      setloading(true);
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos"
        );
        setData(await response.clone().json());
        setfilter(await response.json());
        //  console.log([...data]);
        // console.log(data);
        // console.log(filter);
        setloading(false);
      } catch (error) {
        console.log(error);
      }
      return () => {
        console.log("cleanup function");
      };
    };
    getTodo();
  }, []);

  const Showloading = () => {
    return (
      <main className="row align-item-center mt-4 pt-5">
        <div className="col-md-6 d-flex justify-content-center ">
          <button className="btn btn-primary" type="button" disabled>
            <span
              className="spinner-grow spinner-grow-sm mx-4"
              role="status"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden ">Loading...</span>
          </button>
          <button className="btn btn-primary" type="button" disabled>
            <span
              className="spinner-grow spinner-grow-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Loading...
          </button>
        </div>
        <div className="col-md-6 d-flex justify-content-center">
          <button className="btn btn-primary" type="button" disabled>
            <span
              className="spinner-grow spinner-grow-sm mx-4"
              role="status"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Loading...</span>
          </button>
          <button className="btn btn-primary" type="button" disabled>
            <span
              className="spinner-grow spinner-grow-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Loading...
          </button>
        </div>
      </main>
    );
  };
   function setUpdate(ev) {

     const updatetodo = data.filter((x) => x.completed == ev )

     setfilter(updatetodo)
   }
  const ShowTodo = () => {
    return (
      <main className="row container-fluid">
        <div className="d-flex justify-content-center py-3">
          <button
            type="button"
            className="btn btn-outline-primary fs-5 fw-semibolder"
            onClick={() => setfilter(data) }
          >
            ALL
          </button>
          <button
            type="button"
            className="btn btn-outline-primary mx-4 fs-5 fw-semibolder"
            onClick={() => setUpdate(true) }
          >
            COMPLETE
          </button>
          <button
            type="button"
            className="btn btn-outline-primary fs-5 fw-semibolder"
            onClick={() => setUpdate(false) }
          >
            INCOMPLETE
          </button>
        </div>

        <table className="table  table-bordered border-primary">
          <thead>
            <tr>
              <th scope="col" className="text-center">
                S/N
              </th>
              <th colSpan="2" scope="col" className="text-center">
                Title
              </th>
              <th scope="col" className="text-center">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filter.map((value, index) => {
              return (
                <tr key={index}>
                  <th scope="row" className="text-center">
                    {index < 1 ? 1 : index + 1}
                  </th>
                  <td colSpan="2" className="text-center">
                    {value.title}
                  </td>
                  <td className="text-center">
                    {!value.completed 
                      ? "INCOMPLETED TASK"
                      : "COMPLETED TASK"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>
    );
  };

  return <div className="App">{loading ? <Showloading /> : <ShowTodo />}</div>;
}

export default App;
