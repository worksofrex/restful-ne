import { debounce } from "lodash";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";
import Pagination from "../components/pagination/Pagination";
import { axios } from "../utils/axios.config";
export interface Book {
  id: string;
  name: string;
  author: string;
  publisher: string;
  publicationYear: number;
  subject: string;
}

const Dashboard: React.FC = () => {
  const navigate = useNavigate()
  const [books, setBooks] = useState<Book[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [totalPages] = useState(5);
  const [currentBooks, setCurrentBooks] = useState<Book[]>([]);
  const studentsPerPage = 6;


  useEffect(() => {
    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    setCurrentBooks(books.slice(indexOfFirstStudent, indexOfLastStudent));
  }, [currentPage, books]);

  useEffect(() => {
    if(!localStorage.getItem("token")) {
      localStorage.clear()
    navigate('/login')

    return
    }
    (async () => {
      const res = await axios.get("/books/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setBooks(res.data.data);
      console.log(res.data.data);
    })();
  }, []);

  const search = (query: string) => {
    return new Promise<Book[]>(async (resolve, reject) => {
      if (isSearching) return
      setIsSearching(true)
      const res = await axios.get(`/books/search/?q=${query}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      setIsSearching(false)
      resolve(res.data.data as Book[] || [])
    })

  };

  const handleSearchDebounce = debounce(async (value) => {
    setBooks(await search(value));
  }, 300);

  async function handleChange(value: string) {
    setQuery(value)
    handleSearchDebounce(value);
  }

  useEffect(() => {
  }, [query, isSearching])
  return (
    <div className="flex msm:px-3 md:px-[8vw] font-generalsans overflow-hidden">
      <div className="w-full">
        <Navbar />
        <div className="flex md:flex-row msm:flex-col  gap-10 w-full  items-center justify-between">
          <span className="text-4xl  font-generalsans font-black">
            Library Books
          </span>
          <input type="text" className="border p-4 h-[40px] md:w-[400px] msm:w-full rounded-lg outline-none" placeholder="Search here" value={query} onChange={(e) => handleChange(e.target.value)} />
        </div>
        <div className=" mt-6 border border-slate-100 rounded-lg overflow-hidden md:block msm:hidden">
          <table className="w-full  min-w-[600px] overflow-scroll">
            <thead className="">
              <tr>
                <th className="py-5 px-4 text-left">ID</th>
                <th className="py-5 px-2 text-left">Name</th>
                <th className="py-5 px-2 text-left">Author</th>
                <th className="py-5 text-left">Publisher</th>
                <th className="py-5 px-2 text-left">Publication Year</th>
                <th className="py-5 px-4 text-left">Subject</th>
              </tr>
            </thead>
            <tbody>
              {currentBooks.map((book, i) => (
                <tr key={book.id} className="text-text border-b">
                  <td className="py-5 px-4 ">{i + 1}</td>
                  <td className="py-5 px-2">{book.name}</td>
                  <td className="py-5 px-2">{book.author}</td>
                  <td className="py-5">{book.publisher}</td>
                  <td className="py-5 px-2">{book.publicationYear}</td>
                  <td className="py-5 px-2">{book.subject}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
        <div className="grid grid-cols-2 mt-10 gap-2 msm:grid  md:hidden">
          {currentBooks.map((book, i) => (
            <div key={book.id} className="text-text border border-b rounded-lg bg-white  hover:bg-slate-300/10">
              <div className="p-2 flex flex-col">
                <span className="">{i + 1}</span>
                <span className="text-black">By {book.publisher}</span>
                <span className="font-black text-black text-lg mb-4">{book.name}</span>
                <span className="">{book.author}</span>
                <span className="">{book.publicationYear}</span>
              <span className="">{book.subject}</span>
              </div>
            </div>
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(pageNumber) => setCurrentPage(pageNumber)}
        />
      </div>
    </div>
  );
};

export default Dashboard;
