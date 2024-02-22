import { useState } from "react";

export default function MainMenu({ startGame }) {
  const [formData, setFormData] = useState({
    amount: 1,
    category: "any",
    difficulty: "any",
    type: "any",
  });
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [name]: value,
      };
    });
  }
  function handleSubmit(event) {
    startGame(formData)
    event.preventDefault();
  }
  const categoriesArray = [
    { name: "Any Category", value: "any" },
    { name: "General Knowledge", value: "9" },
    { name: "Entertainment: Books", value: "10" },
    { name: "Entertainment: Film", value: "11" },
    { name: "Entertainment: Music", value: "12" },
    { name: "Entertainment: Musicals & Theatres", value: "13" },
    { name: "Entertainment: Television", value: "14" },
    { name: "Entertainment: Video Games", value: "15" },
    { name: "Entertainment: Board Games", value: "16" },
    { name: "Science & Nature", value: "17" },
    { name: "Science: Computers", value: "18" },
    { name: "Science: Mathematics", value: "19" },
    { name: "Mythology", value: "20" },
    { name: "Sports", value: "21" },
    { name: "Geography", value: "22" },
    { name: "History", value: "23" },
    { name: "Politics", value: "24" },
    { name: "Art", value: "25" },
    { name: "Celebrities", value: "26" },
    { name: "Animals", value: "27" },
    { name: "Vehicles", value: "28" },
    { name: "Entertainment: Comics", value: "29" },
    { name: "Science: Gadgets", value: "30" },
    { name: "Entertainment: Japanese Anime & Manga", value: "31" },
    { name: "Entertainment: Cartoon & Animations", value: "32" },
];


  function form_RenderCategory() {
    return categoriesArray.map((category, i) => (
      <option key={i} value={category.value}>
        {category.name}
      </option>
    ));
  }

  return (
    <div className="start-menu">
      <div className="blob"></div>
      <h2>Quizzical</h2>
      <br></br>
      {/* <form onSubmit={(event) => submitForm(event)}>
       
      </form> */}
      <form onSubmit={handleSubmit} className="options-form">
        <label htmlFor="amount">Questions Amount :</label>
        <input
          type="number"
          min="1"
          max="20"
          placeholder="5"
          onChange={handleChange}
          name="amount"
          id="amount"
          value={formData.amount}
        />
        <label htmlFor="category">Select a category :</label>
        <select
          id="category"
          value={formData.category}
          onChange={handleChange}
          name="category"
        >
          {form_RenderCategory()}
        </select>
        <label htmlFor="difficulty">Select a difficulty</label>
        <select
          id="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
          name="difficulty"
        >
          <option value="any">Any</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <label htmlFor="type">Select question type</label>
        <select
          id="type"
          value={formData.type}
          onChange={handleChange}
          name="type"
        >
          <option value="any">Any</option>
          <option value="boolean">True/False</option>
          <option value="multiple">Multiple Choices</option>
        </select>
        <br />
        <button className="btn-primary">Start Quiz</button>
      </form>
    </div>
  );
}
