export class AuthResponseDto {
    message: string
    data: {
        token: string
        expiresIn: number
    }
}