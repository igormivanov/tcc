import { Center, Heading } from 'native-base'

type Props = {
	title: string
}

export function ScreenHeader({ title }: Props) {
	return (
		<Center bg="white" pb={6} pt={16}>
			<Heading color="gray.500" fontSize="xl" fontFamily="heading">
				{title}
			</Heading>
		</Center>
	)
}