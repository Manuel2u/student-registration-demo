import { toast } from "react-hot-toast";
import {
  Dispatch,
  FC,
  Fragment,
  SetStateAction,
  useState,
  useEffect,
} from "react";
import { useLocation, useNavigate } from "react-router";
import { useQueryStrings } from "../../../hooks";
import { addpageToRoute } from "./broker";

interface Props {
  total: number;
  limit: number;
  skip: number;
  setSkip: Dispatch<SetStateAction<number>>;
}

const Pagination: FC<Props> = ({ total, limit, setSkip, skip }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = useQueryStrings();
  const [page, setPage] = useState(0);
  const [enteredPage, setEnteredPage] = useState(1);

  useEffect(() => {
    if (["", undefined, null].includes(query.get("page"))) {
      setPage(1); //set page
      setEnteredPage(1); //set entered page
      setSkip(0); // set skip
    } else {
      let pageNumber = parseInt(query.get("page") as string) as number;
      setPage(pageNumber);
      setEnteredPage(pageNumber); //set entered page
      setSkip((pageNumber - 1) * limit);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, query.get("page"), setSkip]);

  return (
    <Fragment>
      <nav
        className=" py-3 flex items-center justify-between border-t border-gray-200"
        aria-label="Pagination"
      >
        <div className="hidden sm:block">
          <p className="text-sm text-gray-700">
            Showing Page{" "}
            <input
              type={"number"}
              value={enteredPage}
              onChange={(e) => {
                setEnteredPage(parseInt(e?.target?.value));
              }}
              onKeyPress={(e) => {
                if (e.code === "Enter") {
                  //check if value entered is between the specified pages and set else throw error if its outside
                  if (
                    enteredPage > 0 &&
                    enteredPage <= Math.ceil(total / limit)
                  ) {
                    setSkip(enteredPage * limit);
                    setPage(enteredPage);
                    navigate(addpageToRoute(location, enteredPage.toString()));
                  } else {
                    return toast.error(
                      "Please enter a value between 1 and " +
                        Math.ceil(total / limit)
                    );
                  }
                }
              }}
              className={
                "border border-gray-300 appearance-none w-20 text-center"
              }
            />{" "}
            of <span className="font-medium">{Math.ceil(total / limit)}</span>
          </p>
        </div>
        <div className="flex-1 flex justify-between sm:justify-end">
          <button
            type="button"
            onClick={() => {
              let newPage = page - 1;
              setPage(newPage);
              setEnteredPage(newPage);
              navigate(addpageToRoute(location, newPage.toString()));
            }}
            disabled={skip === 0}
            className={`inline-flex items-center w-24 px-3 py-3 border text-sm leading-4 bg-primary font-medium rounded-none text-white ${
              skip > 0
                ? "bg-primary text-gray-600 hover:text-gray-400 focus:outline-none focus:border-green-700"
                : "bg-gray-100 text-gray-400 cursor-not-allowed focus:outline-none border-transparent "
            }  focus:shadow-outline-red active:bg-red-700 transition ease-in-out duration-150`}
            // className="relative inline-flex items-center px-4 py-2  text-sm font-medium rounded-none text-white bg-red-600 hover:bg-red-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={17}
              height={17}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414zm-6 0a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 011.414 1.414L5.414 10l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span className={"font-light "}>Previous</span>
          </button>
          <button
            type="button"
            onClick={() => {
              let newPage = page + 1;
              setSkip(page * limit);
              setPage(newPage);
              setEnteredPage(newPage);
              navigate(addpageToRoute(location, newPage.toString()));
            }}
            disabled={skip + limit >= total}
            className={`inline-flex items-center ml-3 w-24 justify-center py-3 border bg-primary text-sm leading-4 font-medium rounded-none text-white ${
              skip + limit < total
                ? "bg-primary text-gray-600 hover:text-gray-400 focus:outline-none focus:border-green-700"
                : "bg-gray-100 text-gray-400 cursor-not-allowed focus:outline-none border-transparent "
            }  focus:shadow-outline-red active:bg-red-700 transition ease-in-out duration-150`}
            // className="ml-3 relative inline-flex items-center px-4 py-2  text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
          >
            <div className={"flex flex-row"}>
              <span className={"font-light mr-1"}>Next</span>

              <svg
                width={17}
                height={17}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-chevrons-right"
              >
                <path d="M13 17L18 12 13 7" />
                <path d="M6 17L11 12 6 7" />
              </svg>
            </div>
          </button>
        </div>
      </nav>
    </Fragment>
  );
};

export default Pagination;
