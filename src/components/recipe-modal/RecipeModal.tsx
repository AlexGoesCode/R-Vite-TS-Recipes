import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Recipe } from '../../types/types'; // Import the unified Recipe type

interface RecipeModalProps {
  showModal: boolean;
  selectedRecipe: Recipe | null;
  handleCloseModal: () => void;
  handleEditRecipe: (recipe: Recipe) => void;
  handleDeleteRecipe: (id: string) => void;
}

// RecipeModal component receives the showModal, selectedRecipe, handleCloseModal
function RecipeModal(props: RecipeModalProps) {
  return (
    <Modal show={props.showModal} onHide={props.handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>{props.selectedRecipe?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {props.selectedRecipe && (
          <>
            <img
              src={props.selectedRecipe.image}
              alt={props.selectedRecipe.title}
              style={{ width: '100%' }}
            />
            <p>
              <strong>Cuisine:</strong> {props.selectedRecipe.cuisine}
            </p>
            <p>
              <strong>Diet:</strong> {props.selectedRecipe.diet}
            </p>
            <p>
              <strong>Type:</strong> {props.selectedRecipe.type}
            </p>
            <p>
              <strong>Ingredients:</strong>{' '}
              {props.selectedRecipe.ingredients.join(', ')}
            </p>
            <p>
              <strong>Instructions:</strong> {props.selectedRecipe.instructions}
            </p>
            <p>
              <strong>Author:</strong> {props.selectedRecipe.author}
            </p>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant='secondary'
          onClick={() => props.handleEditRecipe(props.selectedRecipe!)}
        >
          Edit
        </Button>
        <Button
          variant='danger'
          onClick={() => props.handleDeleteRecipe(props.selectedRecipe!.id)}
        >
          Delete
        </Button>
        <Button variant='secondary' onClick={props.handleCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RecipeModal;
