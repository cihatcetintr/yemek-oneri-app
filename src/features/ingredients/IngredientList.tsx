import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { UserIngredient } from '../../types/ingredient';

interface IngredientListProps {
  ingredients: UserIngredient[];
  onIngredientRemove: (id: string) => void;
}

export const IngredientList: React.FC<IngredientListProps> = ({
  ingredients,
  onIngredientRemove
}) => {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {ingredients.map((ingredient) => (
        <ListItem
          key={ingredient.id}
          sx={{
            borderBottom: '1px solid',
            borderColor: 'divider',
            '&:last-child': { borderBottom: 'none' }
          }}
        >
          <ListItemText
            primary={ingredient.name}
            secondary={
              <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
                {ingredient.type && (
                  <Chip
                    label={ingredient.type}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                )}
                {ingredient.quantity && ingredient.unit && (
                  <Chip
                    label={`${ingredient.quantity} ${ingredient.unit}`}
                    size="small"
                    color="secondary"
                    variant="outlined"
                  />
                )}
              </Box>
            }
          />
          <ListItemSecondaryAction>
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => onIngredientRemove(ingredient.id)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
}; 