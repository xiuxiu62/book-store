package book

type BookDto struct {
	Title  string `json:"title"`
	Author string `json:"author"`
	Genre  string `json:"genre"`
}

func (book *Book) toDto() BookDto {
	result := BookDto{
		Title:  book.Title,
		Author: book.Author,
		Genre:  book.Genre,
	}

	return result
}
