import {
  Editable,
  EditablePreview,
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
      defaultValue={defaultValue}
    >
      <EditablePreview />

      {children}

      <EditableControls />
    </Editable>
  );
}
