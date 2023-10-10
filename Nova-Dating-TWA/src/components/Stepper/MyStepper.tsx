import clsx from 'clsx';

interface Props {
    currentStep: number;
    steps: number;
}

export default function MyStepper({ currentStep, steps }: Props) {
    return (
        <div className={'h-3 p-1 rounded-full w-full bg-telegram-secondary-bg flex flex-row space-x-1 items-center'}>
            {Array.from({ length: steps }, (_, index) => (
                <div
                    key={index}
                    className={clsx(
                        'h-2 rounded-full',
                        currentStep > index ? 'bg-telegram-button' : 'bg-telegram-text opacity-10'
                    )}
                    style={{
                        width: 100 / steps + '%'
                    }}
                ></div>
            ))}
        </div>
    );
}
