declare module 'react-rating' {
    import * as React from 'react';

    interface RatingProps {
        start?: number;
        stop?: number;
        step?: number;
        direction?: 'ltr' | 'rtl';
        fractions?: number;
        placeholderRating?: number;
        onChange?: (value: number) => void;
        value?: number;
        emptySymbol?: React.ReactNode;  // Allow custom React nodes
        fullSymbol?: React.ReactNode;   // Allow custom React nodes
        placeholderSymbol?: React.ReactNode; // Allow custom React nodes
        readonly?: boolean;
        quiet?: boolean;
    }

    export default class Rating extends React.Component<RatingProps> { }
}
