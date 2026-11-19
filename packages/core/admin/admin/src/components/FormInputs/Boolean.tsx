import { forwardRef, memo } from 'react';

import { Toggle, useComposedRefs, Field, Flex, TextButton } from '@strapi/design-system';
import { useIntl } from 'react-intl';

import { useFocusInputField } from '../../hooks/useFocusInputField';
import { useField } from '../Form';

import { InputProps } from './types';

const BooleanInput = forwardRef<HTMLInputElement, InputProps>(
  ({ name, required, label, hint, labelAction, disabled, ...props }, ref) => {
    const { formatMessage } = useIntl();
    const field = useField<boolean | null>(name);
    const fieldRef = useFocusInputField<HTMLInputElement>(name);

    const composedRefs = useComposedRefs(ref, fieldRef);

    const handleClear = () => {
      field.onChange(name, null);
    };

    // Only a real boolean value can be cleared. `undefined` (no default on a new entry) has
    // nothing to clear, so the button must stay hidden for it as well as for `null`.
    const showClearButton = !required && typeof field.value === 'boolean' && !disabled;

    return (
      <Field.Root error={field.error} name={name} hint={hint} required={required} maxWidth="320px">
        <Flex justifyContent="space-between" alignItems="flex-end" gap={2}>
          <Field.Label action={labelAction}>{label}</Field.Label>
          {showClearButton && (
            <TextButton onClick={handleClear}>
              {formatMessage({ id: 'clearLabel', defaultMessage: 'Clear' })}
            </TextButton>
          )}
        </Flex>
        <Toggle
          ref={composedRefs}
          checked={field.value === null ? null : field.value || false}
          offLabel={formatMessage({
            id: 'app.components.ToggleCheckbox.off-label',
            defaultMessage: 'False',
          })}
          onLabel={formatMessage({
            id: 'app.components.ToggleCheckbox.on-label',
            defaultMessage: 'True',
          })}
          onChange={field.onChange}
          name={name}
          disabled={disabled}
          {...props}
        />
        <Field.Hint />
        <Field.Error />
      </Field.Root>
    );
  }
);

const MemoizedBooleanInput = memo(BooleanInput);

export { MemoizedBooleanInput as BooleanInput };
