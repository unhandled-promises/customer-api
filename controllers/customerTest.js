import MongodbMemoryServer from "mongodb-memory-server";
import * as mongoose from "mongoose";
import * as request from "supertest";
import app from "../app";
import Book from "./books.model";

describe("/api/items tests", () => {
    const mongod = new MongodbMemoryServer();

    beforeAll(async () => {
        const uri = await mongod.getConnectionString();
        await mongoose.connect(uri, { useNewUrlParser: true });
    });

    afterAll(async () => {
        await mongoose.disconnect();
        await mongod.stop();
    });

    afterEach(async () => {
        await Book.remove({});
    });

    beforeEach(async () => {
        const book = {
            "authors": ["Suzanne Collins"],
            "description": "Set in a dark vision of the near future, a terrifying reality TV show is taking place. Twelve boys and twelve girls are forced to appear in a live event called The Hunger Games. There is only one rule: kill or be killed. When sixteen-year-old Katniss Everdeen steps forward to take her younger sister's place in the games, she sees it as a death sentence. But Katniss has been close to death before. For her, survival is second nature.",
            "image": "http://books.google.com/books/content?id=sazytgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
            "link": "http://books.google.com/books?id=sazytgAACAAJ&dq=title:The+Hunger+Games&hl=&source=gbs_api",
            "title": "The Hunger Games"
        }

        const newBook = new Book(book);
        await newBook.save();
    })

    // Unit Test
    it("should get all books", async () => {
        const response = await request(app)
            .get("/api/books/")

        expect(response.status).toBe(200);
        expect(response.body).toEqual([expect.objectContaining({"authors": ["Suzanne Collins"], "title": "The Hunger Games"})])
    });

    // Unit Test
    it("should post a new book", async () => {
        const newBook = {
            "authors": ["Alexandre Dumas"],
            "description": "The Count of Monte Cristo (French: Le Comte de Monte-Cristo) is an adventure novel by French author Alexandre Dumas (père). It is one of the author's most popular works, along with The Three Musketeers. Dumas completed the work in 1844. The story takes place in France, Italy, islands in the Mediterranean, and in the Levant during the historical events of 1815–1838. It is an adventure story primarily concerned with themes of hope, justice, vengeance, mercy and forgiveness, it focuses on a man who is wrongfully imprisoned, escapes from jail, acquires a fortune and sets about getting revenge on those responsible for his imprisonment. However, his plans have devastating consequences for the innocent as well as the guilty. The book is considered a literary classic today. According to Luc Sante, \"The Count of Monte Cristo has become a fixture of Western civilization's literature, as inescapable and immediately identifiable as Mickey Mouse, Noah's flood, and the story of Little Red Riding Hood.\" This English translation was originally published in 1846 by Chapman and Hall, London.",
            "image": "https://books.google.com/books/content?id=Kt5BBAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
            "link": "https://play.google.com/store/books/details?id=Kt5BBAAAQBAJ&source=gbs_api",
            "title": "The Count Of Monte Cristo"
        }

        const response = await request(app)
            .post("/api/books")
            .send(newBook);

        expect(response.status).toBe(201);
        expect(response.body).toBe("Book saved!")
    });

    // Unit Test
    it("should toss an error trying to add a new book", async () => {
        const newBook = {
            "authors": ["Alexandre Dumas"],
            "description": "The Count of Monte Cristo (French: Le Comte de Monte-Cristo) is an adventure novel by French author Alexandre Dumas (père). It is one of the author's most popular works, along with The Three Musketeers. Dumas completed the work in 1844. The story takes place in France, Italy, islands in the Mediterranean, and in the Levant during the historical events of 1815–1838. It is an adventure story primarily concerned with themes of hope, justice, vengeance, mercy and forgiveness, it focuses on a man who is wrongfully imprisoned, escapes from jail, acquires a fortune and sets about getting revenge on those responsible for his imprisonment. However, his plans have devastating consequences for the innocent as well as the guilty. The book is considered a literary classic today. According to Luc Sante, \"The Count of Monte Cristo has become a fixture of Western civilization's literature, as inescapable and immediately identifiable as Mickey Mouse, Noah's flood, and the story of Little Red Riding Hood.\" This English translation was originally published in 1846 by Chapman and Hall, London.",
            "image": "https://books.google.com/books/content?id=Kt5BBAAAQBAJ&printsec=frontcover&img=1&zoom=5&edge=curl&source=gbs_api",
            "link": "https://play.google.com/store/books/details?id=Kt5BBAAAQBAJ&source=gbs_api"
        }

        const response = await request(app)
            .post("/api/books")
            .send(newBook);

        expect(response.status).toBe(400);
    });

    // Unit Test
    it("should delete a book", async () => {
        const bookInfo = await Book.findOne({title: "The Hunger Games"})
        
        const response = await request(app)
            .delete(`/api/books/${bookInfo._id}`);

        expect(response.status).toBe(202);
        expect(response.body).toBe("Book deleted!");
    });

    // Unit Test
    it("should toss an error trying to delete a book", async () => {
        const response = await request(app)
            .delete("/api/books/43234234324234");

        expect(response.status).toBe(404);
    });    

    // Integration Test
    it("should get >10 books", async () => {
        const response = await request(app)
            .get("/api/books/search/count+of+monte+cristo")

        expect(response.status).toBe(200);
        expect(response.body.totalItems).toBeGreaterThan(10);
    });

    // Integration Test
    it("should return no books", async () => {
        const response = await request(app)
            .get("/api/books/search/asdfasdfasdfasdfasdfasdfasdf")

        expect(response.status).toBe(404);
    });
});