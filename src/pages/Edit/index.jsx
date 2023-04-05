import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useNavigate, useParams } from "react-router-dom";

import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { TextArea } from "../../components/TextArea";
import { NoteItem } from "../../components/NoteItem";
import { Section } from "../../components/Section";
import { Button } from "../../components/Button";

import { api } from "../../services/api";

import { Container, Form } from "./styles";

export function Edit() {
  const [data, setData] = useState(null);
  const params = useParams();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [links, setLinks] = useState([]);
  const [newLink, setNewLink] = useState("");

  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState("");

  //Para navegar para a tela inicial
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const response = await api.get(`/notes/${params.id}`);
      setData(response.data);
      setTitle(response.data.title);
      setDescription(response.data.description);
      setLinks(response.data.links);
      setTags(response.data.tags);
    }

    fetchData();
  }, []);

  //Adicionar link
  function handleAddLink() {
    //Acessando o conteúdo anterior
    setLinks((prevState) => [...prevState, newLink]);
    //Para limpar a caixa de texto, após enviar o conteúdo
    setNewLink("");
  }

  //Remover link
  function handleRemoveLink(deleted) {
    //Qual link será removido, filtrando somente os links não excluídos
    setLinks((prevState) => prevState.filter((link) => link !== deleted));
  }

  //Adicionar uma tag
  function handleAddTag() {
    //acessa tudo que tinha antes, e faz uma nova listagem com tudo que tinha antes
    setTags((prevState) => [...prevState, newTag]);
    //Para limpar a caixa de texto, após enviar o conteúdo
    setNewTag("");
  }

  //Remover uma Tag
  function handleRemoveTag(deleted) {
    setTags((prevState) => prevState.filter((tags) => tags !== deleted));
  }

  async function handleEditNote() {
    if (!title) {
      return alert("Digite o título da nota");
    }

    if (newLink) {
      return alert("O link não está adicionado");
    }

    if (newTag) {
      return alert("A tag não está adicionada");
    }

    //será enviada para a API por método post as seguintes informações, título, descrição, tags e links
    await api.post("/notes", {
      title,
      description,
      tags,
      links,
    });

    alert("Nota Editada com sucesso!");
    navigate("/"); //levar o usuário para a tela inicial
  }

  return (
    <Container>
      <Header />

      <main>
        <Form>
          <header>
            <h1>Editar nota</h1>
            <Link to="/" href="/">
              Voltar
            </Link>
          </header>
          <Input
            placeholder="Título"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <TextArea
            placeholder="Observações"
            onChange={(e) => setDescription(e.target.value)}
            defaultValue={description}
          />

          <Section title="Links úteis">
            {/* Setar todos os links adicionados */}
            {links.map((link, index) => (
              <NoteItem
                key={String(index)}
                value={link.url}
                onClick={() => {
                  handleRemoveLink(link);
                }}
              />
            ))}

            <NoteItem
              isNew
              placeholder="Novo link"
              value={newLink}
              onChange={(e) => setNewLink(e.target.value)}
              onClick={handleAddLink}
            />
          </Section>
          <Section title="Marcadores">
            <div className="tags">
              {tags.map((tag, index) => (
                <NoteItem
                  key={String(index)}
                  value={tag.name}
                  onClick={() => {
                    handleRemoveTag(tag);
                  }}
                />
              ))}

              <NoteItem
                isNew
                placeholder="Nova Tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onClick={handleAddTag}
              />
            </div>
          </Section>
          <Button title="Salvar" onClick={handleEditNote} />
        </Form>
      </main>
    </Container>
  );
}
