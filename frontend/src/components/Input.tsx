import { FormControl, IInputProps, Input as NativeBaseInput } from 'native-base'

type Props = IInputProps & {
	errorMessage?: string | null
}

export function Input({ errorMessage = null, isInvalid, ...rest }: Props) {
	const invalid = !!errorMessage || isInvalid

	return (
		<FormControl isInvalid={invalid} mb={3}>
			<NativeBaseInput
				bg="gray.100"
				h={14}
				px={4}
				borderWidth={0}
				fontSize="md"
				color="gray.700"
				fontFamily="body"
				placeholderTextColor="gray.300"
				isInvalid={invalid}
				_invalid={{
					borderWidth: 2,
					borderColor: "red2"
				}}
				_focus={{
					bgColor: 'gray.200',
					borderWidth: 1,
					borderColor: 'green.500'
				}}
				{...rest}
			/>

			<FormControl.ErrorMessage _text={{ color: "red2" }}>
				{errorMessage}
				
			</FormControl.ErrorMessage>
		</FormControl>
	)
}