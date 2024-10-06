import { Button as ButtonNativeBase, IButtonProps, Text } from 'native-base'

type Props = IButtonProps & {
	title: string
	variant?: 'solid' | 'outline'
}

export function Button({ title, variant = 'solid', ...rest }: Props) {
	return (
		<ButtonNativeBase
			w="full"
			h={14}
			bg={variant === 'outline' ? 'transparent' : 'gray.400'}
			borderWidth={variant === 'outline' ? 1 : 0}
			borderColor="gray.200"
			rounded="sm"
			_pressed={{
				bg: variant === 'outline' ? 'green.300' : 'green.500',
			}}
			{...rest}
		>
			<Text
				color={'white'}
				fontFamily="heading"
				fontSize="sm"
			>
				{title}
			</Text>
		</ButtonNativeBase>
	)
}