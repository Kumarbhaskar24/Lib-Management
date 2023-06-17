import { useState,useEffect } from "react";
import {Button,TextField,Typography,} from "@mui/material";
import { Box, Stack } from "@mui/system";
import { db } from "../firebase";
import ReactLoading from "react-loading";
import { Select, MenuItem } from "@mui/material";
import { Card, CardContent, CardMedia, Dialog, DialogContent, Grid } from "@mui/material";
// import { Button, Box } from "@material-ui/core";
// import { db } from "./firebase";
import { collection, query, orderBy, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import EastIcon from "@mui/icons-material/East";
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper'
import InputBase from '@mui/material/InputBase';
import HomeIcon from '@mui/icons-material/Home'

const UserBooks = () => {

  const imageStyle = {
    height: "100%",
    width: "100%",
    backgroundImage:
      'url("https://c4.wallpaperflare.com/wallpaper/568/232/7/texture-simple-dark-simple-background-wallpaper-preview.jpg")',
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    color: "white",
  };


  const [booksData, setBooksData] = useState([]);
//   const [openForm, setOpenForm] = useState(false);
//   const [formType, setFormType] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sortCriteria, setSortCriteria] = useState("title");
  const [sortDirection, setSortDirection] = useState("asc");

  let tempData = [...booksData];

  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10;

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = filteredBooks.slice(
    indexOfFirstResult,
    indexOfLastResult
  );

  const totalPages = Math.ceil(filteredBooks.length / resultsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    setIsLoading(true);
    async function firestoreData() {
      let tempBooks = [];
      try {
        const q1 = query(collection(db, "books"), orderBy("bookId"));
        const querySnapshot2 = await getDocs(q1);
        querySnapshot2.forEach((doc) => {
          tempBooks.push(doc.data());
        });
      } catch (err) {
        console.log(err);
      }
      setIsLoading(false);
      setBooksData(tempBooks);
      setFilteredBooks(tempBooks);
    }
    firestoreData();
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const [selectedBook, setSelectedBook] = useState(null);

const handleCardClick = (book) => {
  setSelectedBook(book);
};

const handleCloseDialog = () => {
  setSelectedBook(null);
};
  // useEffect(() => {
  //   // Filter books when searchQuery changes
  //   filterBooks(searchQuery);
  // }, [searchQuery]);
  useEffect(() => {
    const filterBooks = () => {
      const filtered = booksData.filter((book) => {
        const { title, author, pubDate, subject } = book;

        // Check if any of the book properties match the search query
        return (
          title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          author.toLowerCase().includes(searchQuery.toLowerCase()) ||
          pubDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
          subject.toLowerCase().includes(searchQuery.toLowerCase())
        );
      });

      setFilteredBooks(filtered);
    };

    filterBooks();
  }, [booksData, searchQuery]);

  const handleSortCriteriaChange = (event) => {
    setSortCriteria(event.target.value);
  };

  const handleSortDirectionChange = (event) => {
    setSortDirection(event.target.value);
  };

  const sortBooks = () => {
    const sorted = [...filteredBooks].sort((a, b) => {
      const fieldA = a[sortCriteria];
      const fieldB = b[sortCriteria];

      if (fieldA < fieldB) {
        return sortDirection === "asc" ? -1 : 1;
      }
      if (fieldA > fieldB) {
        return sortDirection === "asc" ? 1 : -1;
      }
      return 0;
    });

    setFilteredBooks(sorted);
  };

  useEffect(() => {
    sortBooks();
  }, [sortCriteria, sortDirection]);

  return (
    <Box sx={imageStyle }>
    <Box p={2} ml={2}>
      <Stack
        direction="row"
        spacing={4}
        mb={3}
        ml={3}
        mr={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack direction="row" alignItems="center" >
          <Typography variant="h3">BOOKS</Typography>
        </Stack>

        <Stack direction="row">
        <Paper>
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
                <InputBase
            sx={{ ml: 1, flex: 1 }}
                placeholder="Search Books"
                value={searchQuery}
                variant="outlined"
                onChange={handleSearch}
                />
          </Paper>
          {searchQuery && (
            <Typography variant="body2">
              Search Results: {filteredBooks.length}
            </Typography>
          )}
        </Stack>
        <Stack direction="row" alignItems="center" >
          <Select
            value={sortCriteria}
            onChange={handleSortCriteriaChange}
            variant="outlined"
            sx={{ marginRight: "8px", backgroundColor:"whitesmoke" }}
          >
            <MenuItem value="title">Title</MenuItem>
            <MenuItem value="author">Author</MenuItem>
            <MenuItem value="pubDate">Publish Date</MenuItem>
            <MenuItem value="subject">Subject</MenuItem>
          </Select>
          <Select
            value={sortDirection}
            onChange={handleSortDirectionChange}
            variant="outlined"
            sx={{backgroundColor:"whitesmoke"}}
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </Stack>
        <Stack direction="row" alignItems="center">
          <Button
            variant="contained"
            component={Link}
            to="/home"
            sx={{ textDecoration: "none" }}
          >
            <HomeIcon fontSize="small" sx={{mr:2}} />
            Back to Home
             <EastIcon sx={{ verticalAlign: "middle", marginLeft: "5px" }} /> 
            {/* <HomeIcon fontSize="small" /> */}
          </Button>
        </Stack>
      </Stack>

      {filteredBooks.length > 0 && (
  <Grid container spacing={2} ml={7} justifyContent="center">
    {currentResults.map((book, index) => (
      <Grid item xs={12} sm={6} md={4} key={book.bookId}>
        <Card
          sx={{
            maxWidth: 345,
            transition: 'box-shadow 0.3s',
            backgroundColor:"teal",
            borderRadius:"20px",
            '&:hover': {
              boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
              transform: 'scale(1.05)',
            },
          }}
          onClick={() => handleCardClick(book)}
        >
          <CardMedia
            component="img"
            height="140"
            image={book.imgpath} 
            alt="Dummy Image"
            sx={{ objectFit: 'contain' }}
          />
          <CardContent sx={{ textAlign: 'center' }}>
            {/* <Typography variant="h6" component="div">
              Book ID: {book.bookId}
            </Typography> */}
            <Typography variant="h6" color="text.secondary">
              Title: {book.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Author: {book.author}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Published Date: {book.pubDate}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Subject: {book.subject}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
)}

<Dialog open={selectedBook !== null} onClose={handleCloseDialog}>
  <DialogContent>
    {selectedBook && (
      <div>
        <Typography variant="h6" component="div">
           {selectedBook.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Description: {selectedBook.description}
        </Typography>
      </div>
    )}
  </DialogContent>
</Dialog>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {isLoading && (
          <ReactLoading
            type={"bars"}
            color={"#0090da"}
            height={150}
            width={150}
          />
        )}
      </div>
      <Box display="flex" justifyContent="center" mt={2}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <Button
            key={page}
            onClick={() => handlePageChange(page)}
            variant="contained"
            color="primary"
            style={{ margin: "0.5rem" }}
          >
            {page}
          </Button>
        ))}
      </Box>
    </Box>
    </Box>
  );
};

export default UserBooks;
