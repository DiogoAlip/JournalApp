import { describe, test, expect } from "vitest";
import { noteData } from "./noteData";
import { Note } from "../store/journal";

const mockNote1: Note = {
  id: "1",
  title: "Primera",
  body: "Este es el cuerpo",
  date: 1640000000000,
  imageUrls: [],
};

const mockNote2: Note = {
  id: "2",
  title: "Segunda",
  body: "Otro cuerpo más largo",
  date: 1700000000000,
  imageUrls: [],
};

const mockNote3: Note = {
  id: "3",
  title: "Tercera nota",
  body: "Contenido",
  date: 1620000000000,
  imageUrls: [],
};

describe("noteData", () => {
  test("debe retornar valores iniciales con array vacío", () => {
    const result = noteData([]);

    expect(result.totalNotesLength).toBe(0);
    expect(result.totalTitleNotesLength).toBe(0);
    expect(result.totalBodyNotesLength).toBe(0);
    expect(result.oldestNote).toBe(0);
    expect(result.newestNote).toBe(0);
  });

  test("debe calcular correctamente con una nota", () => {
    const result = noteData([mockNote1]);

    expect(result.totalTitleNotesLength).toBe(mockNote1.title.length); // "Primera" = 7
    expect(result.totalBodyNotesLength).toBe(mockNote1.body.length); // "Este es el cuerpo" = 17
    expect(result.totalNotesLength).toBe(
      mockNote1.title.length + mockNote1.body.length
    ); // 24
    expect(result.oldestNote).toBe(mockNote1.date);
    expect(result.newestNote).toBe(mockNote1.date);
  });

  test("debe calcular correctamente con múltiples notas", () => {
    const result = noteData([mockNote1, mockNote2]);

    const expectedTitleLength = mockNote1.title.length + mockNote2.title.length;
    const expectedBodyLength = mockNote1.body.length + mockNote2.body.length;
    const expectedTotalLength = expectedTitleLength + expectedBodyLength;

    expect(result.totalTitleNotesLength).toBe(expectedTitleLength);
    expect(result.totalBodyNotesLength).toBe(expectedBodyLength);
    expect(result.totalNotesLength).toBe(expectedTotalLength);
  });

  test("debe encontrar la nota más antigua correctamente", () => {
    const result = noteData([mockNote1, mockNote2, mockNote3]);

    expect(result.oldestNote).toBe(mockNote3.date); // 1620000000000 es la más antigua
  });

  test("debe encontrar la nota más reciente correctamente", () => {
    const result = noteData([mockNote1, mockNote2, mockNote3]);

    expect(result.newestNote).toBe(mockNote2.date); // 1700000000000 es la más reciente
  });

  test("debe manejar notas con títulos y cuerpos vacíos", () => {
    const emptyNote: Note = {
      id: "4",
      title: "",
      body: "",
      date: 1680000000000,
      imageUrls: [],
    };

    const result = noteData([emptyNote]);

    expect(result.totalTitleNotesLength).toBe(0);
    expect(result.totalBodyNotesLength).toBe(0);
    expect(result.totalNotesLength).toBe(0);
    expect(result.oldestNote).toBe(emptyNote.date);
    expect(result.newestNote).toBe(emptyNote.date);
  });

  test("debe ser determinístico (mismo input = mismo output)", () => {
    const notes = [mockNote1, mockNote2, mockNote3];

    const result1 = noteData(notes);
    const result2 = noteData(notes);

    expect(result1).toEqual(result2);
  });

  test("debe acumular correctamente con muchas notas", () => {
    const manyNotes: Note[] = Array.from({ length: 10 }, (_, i) => ({
      id: `${i}`,
      title: `Título ${i}`.repeat(2),
      body: `Cuerpo ${i}`.repeat(3),
      date: 1640000000000 + i * 1000000,
      imageUrls: [],
    }));

    const result = noteData(manyNotes);

    const expectedTotal = manyNotes.reduce(
      (sum, note) => sum + note.title.length + note.body.length,
      0
    );

    expect(result.totalNotesLength).toBe(expectedTotal);
    expect(result.oldestNote).toBe(manyNotes[0].date);
    expect(result.newestNote).toBe(manyNotes[9].date);
  });

  test("debe calcular longitudes en orden correcto (body + title)", () => {
    const note: Note = {
      id: "test",
      title: "12345",
      body: "1234567",
      date: 1640000000000,
      imageUrls: [],
    };

    const result = noteData([note]);

    expect(result.totalTitleNotesLength).toBe(5);
    expect(result.totalBodyNotesLength).toBe(7);
    expect(result.totalNotesLength).toBe(12);
  });
});
