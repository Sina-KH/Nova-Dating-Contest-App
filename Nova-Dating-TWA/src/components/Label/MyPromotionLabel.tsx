interface Props {
    text: string;
    className?: string;
}
export default function MyPromotionLabel({ text, className }: Props) {
    return (
        <p className={className}>
            <span className={'text-telegram-button'}>{text.substring(0, 1)}</span>
            {text.substring(1)}
        </p>
    );
}
