import {
  Editable,
  EditablePreview,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { EditableControls } from './EditableControls';

interface EditableLayoutProps {
  defaultValue: string | undefined;
  children: ReactNode;
}

export function EditableLayout({
  children, defaultValue,
}: EditableLayoutProps) {
  return (
    <Editable
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      isPreviewFocusable
      selectAllOnFocus
      defaultValue={defaultValue}
      borderRadius="base"
      boxShadow="inner"
      backgroundColor="whiteAlpha.100"
    >
      <Tooltip label="clique para editar">
        <EditablePreview
          px={2}
          _hover={{
            background: useColorModeValue('gray.100', 'gray.700'),
          }}
        />
      </Tooltip>

      {children}

      <EditableControls />
    </Editable>
  );
}
