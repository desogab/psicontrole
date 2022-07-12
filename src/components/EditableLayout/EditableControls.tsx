import { CheckIcon, CloseIcon, EditIcon } from '@chakra-ui/icons';
import { ButtonGroup, IconButton, useEditableControls } from '@chakra-ui/react';

export function EditableControls() {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls();

  return isEditing ? (
    <ButtonGroup flex="1" justifyContent="end" size="sm" w="full" pl="3" spacing={2}>
      <IconButton aria-label="confirmar atualização" icon={<CheckIcon />} {...getSubmitButtonProps()} />
      <IconButton
        aria-label="cancelar atualização"
        icon={<CloseIcon boxSize={3} />}
        {...getCancelButtonProps()}
      />
    </ButtonGroup>
  ) : <IconButton aria-label="editar campo" size="sm" icon={<EditIcon />} {...getEditButtonProps()} />;
}
