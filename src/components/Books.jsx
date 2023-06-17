import { useState } from "react";
import {  Button,FormControlLabel,FormLabel,IconButton,Modal,Radio,RadioGroup,TextField,Tooltip,Typography,} from "@mui/material";
import { Box, Stack } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import {collection,addDoc,deleteDoc,query,where,getDocs,updateDoc} from "firebase/firestore";
import { db } from "../firebase";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../index.css";
const formStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 600,
  bgcolor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};


let imageStyle = {
  height: "100vh",
  width: "100vw",
  backgroundImage:
    'url("https://c4.wallpaperflare.com/wallpaper/526/8/1002/library-interior-interior-design-books-wallpaper-preview.jpg")',
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  color: "white",
};

const Books = ({ booksData, setBooksData }) => {
  const [openForm, setOpenForm] = useState(false);
  const [formType, setFormType] = useState(null);
  const [editIndex, setEditIndex] = useState(null);

   //const [bookId, setBookId] = useState(0);
  // const [title, setTitle] = useState("");
  // const [author, setAuthor] = useState("");
  // const [pubDate, setPubDate] = useState("");
  // const [subject, setSubject] = useState("");
  //const [issued, setIssued] = useState("issued");

  //const [bookId, setBookId] = useState(formType === "edit"? booksData[editIndex].bookId:(parseInt(booksData[booksData.length - 1].bookId) + 1).toString());
  const [bookId, setBookId] = useState(() => {
    if (formType === "edit" && booksData[editIndex]) {
      return booksData[editIndex].bookId;
    } else if (booksData.length > 0) {
      const lastBookId = parseInt(booksData[booksData.length - 1].bookId);
      return (lastBookId + 1).toString();
    } else {
      return "1";
    }
  });
  
  const [title, setTitle] = useState(formType === "edit" ? booksData[editIndex].title : "" );
  const [author, setAuthor] = useState(formType === "edit" ? booksData[editIndex].author : "");
  const [pubDate, setPubDate] = useState(formType === "edit" ? booksData[editIndex].pubDate : "");
  const [subject, setSubject] = useState(formType === "edit" ? booksData[editIndex].subject : "");
  const [issued, setIssued] = useState("issued");
  const [sub, setSub] = useState("");
  let tempData = [...booksData];

  const addFormSubmit = async (e) => {
    e.preventDefault();
    const form = e.target; // Get the form element

    const newTitle = form.title.value;
    const newAuthor = form.author.value;
    const newPubDate = form.PublishedDate.value;
    const newSubject = form.subject.value;
    const newIssued = form.issued.value;
    const imagepath=form.imgpath.value;
    const description = form.description.value;

    try {
      const bookRef = collection(db, "books");
      await addDoc(bookRef, {
        bookId,
        title: newTitle,
        author: newAuthor,
        pubDate: newPubDate,
        subject: newSubject,
        issued: newIssued,
        description: description,
        imgpath: imagepath
      });
      console.log("Book added successfully!");
      toast.success("Book added successfully!");
        window.location.reload();
    } catch (error) {
      console.error("Error adding book:", error);
      toast.error("Error adding book:");
    }

    setOpenForm(false);
  };
  async function editFormSubmit(e) {
    e.preventDefault();
    const form = e.target; // Get the form element

    const newTitle = form.title.value;
    const newAuthor = form.author.value;
    const newPubDate = form.PublishedDate.value;
    const newSubject = form.subject.value;
    const newIssued = form.issued.value;
    const imagepath=form.imgpath.value;
    const description = form.description.value;
    try {
      const booksRef = collection(db, "books");
      const querySnapshot = await getDocs(booksRef);

      querySnapshot.forEach((doc) => {
        const bookData = doc.data();
        if (bookData.bookId === booksData[editIndex].bookId) {
          const bookRef = doc.ref;
          updateDoc(bookRef, {
            title: newTitle,
            author: newAuthor,
            pubDate: newPubDate,
            subject: newSubject,
            issued: newIssued,
            description: description,
            imgpath: imagepath
          });
          console.log("Book updated successfully!");
          toast.success("Book updated successfully!");
          window.location.reload();
        }
      });
    } catch (error) {
      console.error("Error updating book:", error);
      toast.error("Error updating book");
    }

    setOpenForm(false);
  }

  const editBtnHandler = (index) => {
    setFormType("edit");
    setEditIndex(index);
    setOpenForm(true);
    setTimeout(() => {
      const book = booksData[index];
      document.getElementById("bookId").value = book.bookId;
      document.getElementById("title").value = book.title;
      document.getElementById("author").value = book.author;
      document.getElementById("PublishedDate").value = book.pubDate;
      document.getElementById("subject").value = book.subject;
      document.getElementById("issued").value = book.issued;
      document.getElementById("issued").checked = true;
      document.getElementById("imgpath").value = book.imgpath;
      document.getElementById("description").value = book.description;
    }, 1000);
  };

  const addBtntHandler = () => {
    setFormType("add");
    setOpenForm(true);
  };

  const deleteBook = async (bookId) => {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "books"), where("bookId", "==", bookId))
      );
        console.log(querySnapshot);
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          deleteDoc(doc.ref);
        });
        console.log("Book deleted successfully!");
        toast.success("Book deleted successfully!");

        window.location.reload();
      } else {
        console.log("Book not found!");
      }
    } catch (error) {
      console.error("Error deleting book:", error);
      toast.error("Error deleting book");
    }
  };

  const deleteHandler = (index) => {
    let confirmBool = window.confirm(
      `Are you sure you want to delete "${booksData[index].title}"?`
    );
    if (confirmBool) {
      console.log(index, booksData[index].title);
      const bookId = booksData[index].bookId;
      console.log(bookId);
      deleteBook(bookId);
    }
  };
  const handleRadioChange = (event) => {
    setIssued(event.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(e.target.title.value);
    try {
      const bookRef = collection(db, "books");
      await addDoc(bookRef, {
        bookId,
        title,
        author,
        pubDate,
        subject,
        issued,
      });

      // Clear the form after successful submission
      setBookId(0);
      setTitle("");
      setAuthor("");
      setPubDate("");
      setSubject("");
      setIssued(false);

      console.log("Book added successfully!");
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };
  const BookForm = () => {
    return (
      <Modal
        open={openForm}
        onClose={() => {
          setOpenForm(false);
        }}
      >
        <Box sx={formStyle}>
          <Typography variant="h4" textAlign="center">
            {formType === "edit" ? "Edit" : "Add"} Book
          </Typography>
          <form
            onSubmit={formType === "edit" ? editFormSubmit : addFormSubmit}
            style={{ height: "100%" }}
            autoComplete="off"
          >
            <Stack
              height={"100%"}
              p={3}
              alignItems="space-center"
              justifyContent="space-around"
            >
              <TextField
                disabled
                variant="outlined"
                label="Book ID"
                id="bookId"
                value={bookId}
              />
              <TextField
                required
                variant="outlined"
                id="title"
                label="Title"
                //  onChange={(e) => setTitle(e.target.value)}
                //  value={title}
              />
              <TextField
                required
                variant="outlined"
                id="author"
                label="Author"
                //  onChange={(e) => setAuthor(e.target.value)}
                // value={author}
              />
              <TextField
                required
                variant="outlined"
                id="PublishedDate"
                label="Published Date"
                // onChange={(e) => setPubDate(e.target.value)}
                // value={pubDate}
              />
              <TextField
                required
                variant="outlined"
                id="subject"
                label="Subject"
                // onChange={(e) => setSubject(e.target.value)}
                // value={subject}
              />
               <TextField
                required
                variant="outlined"
                id="imgpath"
                label="Image Link"
                // onChange={(e) => setSubject(e.target.value)}
                // value={subject}
              />
               <TextField
                required
                variant="outlined"
                id="description"
                label="Description"
                // onChange={(e) => setSubject(e.target.value)}
                // value={subject}
              />
              <Stack direction="row" alignItems="center" gap={2}>
                <FormLabel>Status:</FormLabel>
                <RadioGroup
                  row
                  defaultValue={issued}
                  name="issued"
                  id="issued"

                   //onChange={handleRadioChange}
                >
                  <FormControlLabel
                  name="issued"
                    value="available"
                    control={<Radio />}
                    label="Available"
                  />
                  <FormControlLabel
                  name="issued"
                    value="issued"
                    control={<Radio />}
                    label="Issued"
                  />
                </RadioGroup>
              </Stack>
              <Button variant="contained" color="success" type="submit">
                {formType === "edit" ? "Update Book" : "Add Book"}
              </Button>
              <Button variant="outlined" onClick={() => setOpenForm(false)}>
                Cancel
              </Button>
            </Stack>
          </form>
        </Box>
      </Modal>
    );
  };

  return (
    <Box p={2} ml={2} sx={{imageStyle}}>
      <ToastContainer />
      <Stack direction="row" spacing={4} mb={3}>
        <Typography variant="h4">Books</Typography>
        <Button
          variant="contained"
          color="success"
          startIcon={<AddIcon />}
          onClick={addBtntHandler}
        >
          Add new book
        </Button>
      </Stack>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ background: "#ddd" }}>
            <TableRow>
              <TableCell sx={{ fontSize: "1.1em" }}>Book ID</TableCell>
              <TableCell sx={{ fontSize: "1.1em" }}>Title</TableCell>
              <TableCell sx={{ fontSize: "1.1em" }}>Author</TableCell>
              <TableCell sx={{ fontSize: "1.1em" }}>Pub Date</TableCell>
              <TableCell sx={{ fontSize: "1.1em" }}>Subject</TableCell>
              <TableCell sx={{ fontSize: "1.1em" }}>Status</TableCell>
              <TableCell sx={{ fontSize: "1.1em" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          {booksData.length > 0 && (
            <TableBody>
              {booksData.map((book, index) => (
                <TableRow
                  key={book.bookId}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {book.bookId}
                  </TableCell>
                  <TableCell>{book.title}</TableCell>
                  <TableCell>{book.author}</TableCell>
                  <TableCell>{book.pubDate}</TableCell>
                  <TableCell>{book.subject}</TableCell>
                  <TableCell
                    sx={book.issued==="issued" ? { color: "red" } : { color: "green" }}
                  >
                    {book.issued==="issued" ? "Issued" : "Available"}
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton
                        aria-label="Edit"
                        color="warning"
                        onClick={() => editBtnHandler(index)}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        aria-label="Delete"
                        color="error"
                        onClick={() => deleteHandler(index)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>

      <BookForm />
    </Box>
  );
};

export default Books;
