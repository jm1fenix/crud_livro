import React, { useState, useEffect } from 'react';
import './App.css'
import axios from "axios"
function App() {
  const [livros, setLivros] = useState([]);
  const [novoLivro, setNovoLivro] = useState({
    isbn: '',
    titulo: '',
    genero: '',
    editora: '',
    autor: '',
  });

  const fetchLivros = async () => {
    try {
      const response = await axios.get('http://localhost:8090/livros');
      setLivros(response.data);
    } catch (error) {
      console.error('Erro ao buscar livros:', error);
    }
  };

  useEffect(() => {
    fetchLivros();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNovoLivro((prevLivro) => ({
      ...prevLivro,
      [name]: value,
    }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8090/livros', novoLivro);
      fetchLivros();
      if (!novoLivro) {

        
      }
      setNovoLivro({
        isbn: '',
        titulo: '',
        genero: '',
        editora: '',
        autor: '',
      });
    } catch (error) {
      console.error('Erro ao criar livro:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8090/livros/${id}`);
      fetchLivros();
    } catch (error) {
      console.error('Erro ao excluir livro:', error);
    }
  };

  const handleUpdate = async (id, livroAtualizado) => {
    try {
      await axios.put(`http://localhost:8090/livros/${id}`, livroAtualizado);
      fetchLivros();
    } catch (error) {
      console.error('Erro ao atualizar livro:', error);
    }
  };

  return (
    <>
      <div>
        {/* Cabeçalho */}
        <h1>Gerenciamento de Livros</h1>

        {/* Formulário de adição de livro */}
        <form onSubmit={handleSubmit}>
          {/* Campo para a isbn */}
          <input
            type="number"
            name="isbn"
            placeholder="isbn"
            value={novoLivro.isbn}
            onChange={handleInputChange}
          />
          {/* Campo para a titulo */}
          <input
            type="text"
            name="titulo"
            placeholder="Título"
            value={novoLivro.titulo}
            onChange={handleInputChange}
          />
          {/* Campo para a genero */}
          <input
            type="text"
            name="genero"
            placeholder="Gênero"
            value={novoLivro.genero}
            onChange={handleInputChange}
          />
          {/* Campo para o editora */}
          <input
            type="text"
            name="editora"
            placeholder="Editora"
            value={novoLivro.editora}
            onChange={handleInputChange}
          />
          {/* Campo para o autor */}
          <input
            type="text"
            name="autor"
            placeholder="Autor"
            value={novoLivro.autor}
            onChange={handleInputChange}
          />
          <br /><br />
          {/* Botão de envio do formulário */}
          <button type="submit">Adicionar Livro</button>
        </form>

        {/* Lista de livros */}
        <ul>
          {/* Mapeamento dos livros */}
          {livros.map((livro) => (
            <li key={livro.id}>
              {/* Exibição dos detalhes do livro */}
              {livro.isbn} - {livro.titulo} {livro.genero} {livro.editora} ({livro.autor})

              {/* Botão de exclusão */}
              <button onClick={() => handleDelete(livro.id)}>Excluir</button>

              {/* Botão de atualização */}
              <button
                onClick={() =>
                  handleUpdate(livro.id, {
                    ...livro,
                    isbn: novoLivro.isbn !== "" ? novoLivro.isbn : livro.isbn,
                    titulo: novoLivro.titulo !== "" ? novoLivro.titulo : livro.titulo,
                    genero: novoLivro.genero !== "" ? novoLivro.genero : livro.genero,
                    editora: novoLivro.editora !== "" ? novoLivro.editora : livro.editora,
                    autor: novoLivro.autor !== "" ? novoLivro.autor : livro.autor
                  })
                }
              >
                Atualizar
              </button>
            </li>
          ))}
        </ul>
      </div>

    </>
  )
}

export default App
