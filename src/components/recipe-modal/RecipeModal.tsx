import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

type Recipe = {
  id: string;
  title: string;
  cuisine?: string;
  diet?: string;
  name: string;
  image: string;
  type?: string;
  ingredients: string[];
  instructions: string;
  author: string;
};

interface RecipeModalProps {
  showModal: boolean;
  selectedRecipe: Recipe | null;
  handleCloseModal: () => void;
}

const RecipeModal: React.FC<RecipeModalProps> = ({
  showModal,
  selectedRecipe,
  handleCloseModal,
}) => {
  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{selectedRecipe?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <img
          src={selectedRecipe?.image}
          alt={selectedRecipe?.title}
          style={{ width: '100%' }}
        />
        <p>
          <strong>Cuisine:</strong> {selectedRecipe?.cuisine}
        </p>
        <p>
          <strong>Diet:</strong> {selectedRecipe?.diet}
        </p>
        <p>
          <strong>Type:</strong> {selectedRecipe?.type}
        </p>
        <p>
          <strong>Ingredients:</strong> {selectedRecipe?.ingredients.join(', ')}
        </p>
        <p>
          <strong>Instructions:</strong> {selectedRecipe?.instructions}
        </p>
        <p>
          <strong>Author:</strong> {selectedRecipe?.author}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RecipeModal;
