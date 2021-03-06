import React, { useContext } from 'react';
import { TourContext } from './tourContext';
import { numberWithCommas, getDiscountedPrice, getMonthlyPayment } from './util';

const BookingDetails = (props) => {
	const { selectedTrip, showBookingMessage } = props;
	const tour = useContext(TourContext);
	const tourListPrice = tour.listed_price;
	const maxDiscountedPrice = getDiscountedPrice(tour);
	let monthlyPayment = getMonthlyPayment(tour.listed_price);
	let tripDiscountedPrice;
	let savings;

	if (showBookingMessage && selectedTrip.discount > 0) {
		tripDiscountedPrice = Math.round(tour.listed_price * ((100 - selectedTrip.discount) / 100));
		monthlyPayment = getMonthlyPayment(tripDiscountedPrice);
		savings = tourListPrice - tripDiscountedPrice;
	}

	return (
		<div className="c-trip-detail-calendar-booking__details">
			<div className="c-trip-detail-calendar-booking__details-main">
				<div className="c-trip-detail-calendar-booking__details-item-main">
					<div className="c-trip-detail-calendar-booking__details-item-outer">
						<div className="c-trip-detail-calendar-booking__details-item-wrapper">
							<h4 className="c-trip-detail-calendar-booking-title-inner">{tour.name}</h4>
							<span className="c-trip-detail-calendar-booking-title-overview">
								<div>
									Only $200 deposit to book. <br />
								</div>
							</span>
						</div>
					</div>
				</div>
			</div>

			<div className="c-trip-detail-calendar-booking__guarantees">
				<div className="c-trip-detail-calendar-booking__guarantees-wrapper">
					<div className="c-trip-detail-calendar-booking__guarantees-item" data-guarantee-type="freedom">
						<div className="c-trip-detail-calendar-booking__guarantees-item-wrapper">
							<div className="c-trip-detail-calendar-booking__guarantees-item-left">
								<div className="c-trip-detail-calendar-booking__guarantees-item-icon" />
							</div>
							<div className="c-trip-detail-calendar-booking__guarantees-item-right">
								<div className="c-trip-detail-calendar-booking__guarantees-item-right-title">
									FREEDOM GUARANTEE
								</div>
								<div className="c-trip-detail-calendar-booking__guarantees-item-right-body prop-header-body">
									Change travel dates of trip for FREE. <br /> More <span className="more-icon" />
								</div>
							</div>
						</div>
					</div>
					<div className="c-trip-detail-calendar-booking__guarantees-item">
						<div className="c-trip-detail-calendar-booking__guarantees-item-wrapper">
							<div className="c-trip-detail-calendar-booking__guarantees-item-left">
								<div className="c-trip-detail-calendar-booking__guarantees-item-icon" />
							</div>
							<div className="c-trip-detail-calendar-booking__guarantees-item-right">
								<div className="c-trip-detail-calendar-booking__guarantees-item-right-title">
									FLEX DEPOSIT
								</div>
								<div className="c-trip-detail-calendar-booking__guarantees-item-right-body prop-header-body">
									Can't travel? Save your deposit for later.<br />More <span className="more-icon" />
								</div>
							</div>
						</div>
					</div>
					<div className="c-trip-detail-calendar__uplift-finance uplift-is-loaded">
						<div className="uplift-logo">
							<img src="/up-lift-logo.svg" className="c-trip-cover__financing-logo" />
						</div>
						<div className="uplift-finance-message">
							<span>
								Financing available! Spread the cost of your trip over 12 months. Choose it on checkout.
							</span>
						</div>
					</div>
				</div>
			</div>

			<div className="c-trip-detail-calendar-booking__details-accomodation-total">
				<div className="c-trip-detail__table-inner-wrap">
					{(tripDiscountedPrice || !showBookingMessage) && (
						<div className="c-trip-detail-calendar__outer-box-price-was c-trip-detail-calendar-booking__details-accomodation-box-price-was prop-booking-box-price">
							<p>
								<span className="c-trip-detail-calendar-booking__total-price-copy c-trip-detail-calendar-booking__total-price-was">
									WAS
								</span>
								<span className="c-trip-detail-calendar-booking__details-price-was">
									${numberWithCommas(tourListPrice)}
								</span>
							</p>
						</div>
					)}
					{showBookingMessage &&
					tripDiscountedPrice && (
						<div className="c-trip-detail-calendar__outer-box-price-disc c-trip-detail-calendar-booking__details-accomodation-box-price-disc prop-booking-box-price">
							<p>
								<span className="c-trip-detail-calendar-booking__total-price-copy c-trip-detail-calendar-booking__total-price-disc">
									SAVE
								</span>
								<span className="c-trip-detail-calendar-booking__details-price-disc c-trip-detail-calendar-booking__details-price-disc-discounted">
									${numberWithCommas(savings)}
								</span>
							</p>
							<p>
								Book by
								<span className="c-trip-detail-calendar__due-date"> May 31st 2019</span>
							</p>
						</div>
					)}
					{!showBookingMessage && (
						<div className="c-trip-detail-calendar-booking__details-accomodation-box-p prop-booking-box-price">
							<p>
								<span className="c-trip-detail-calendar-booking__total-price-copy">Now from</span>
								<span className="c-trip-detail-calendar-booking__details-accomodation-box-total-price c-trip-detail-calendar-booking__details-accomodation-box-total-price-discounted">
									${numberWithCommas(maxDiscountedPrice)}
								</span>
							</p>
						</div>
					)}
					{showBookingMessage && (
						<div className="c-trip-detail-calendar-booking__details-accomodation-box-p prop-booking-box-price">
							<p>
								<span className="c-trip-detail-calendar-booking__total-price-copy">Total Price</span>
								{tripDiscountedPrice && (
									<span className="c-trip-detail-calendar-booking__details-accomodation-box-total-price c-trip-detail-calendar-booking__details-accomodation-box-total-price-discounted">
										${numberWithCommas(tripDiscountedPrice)}
									</span>
								)}
								{!tripDiscountedPrice && (
									<span className="c-trip-detail-calendar-booking__details-accomodation-box-total-price">
										${numberWithCommas(tourListPrice)}
									</span>
								)}
							</p>
							<p>Based on twin share</p>
						</div>
					)}
					<div className="c-trip-detail-calendar-booking__uplift-section discount-available">
						<div className="c-trip-detail-calendar-uplift__monthly-amount prop-listen-change-attr">
							<div className="c-trip-detail-calendar-booking__pay-from-title">FINANCING FROM</div>
							<span>$</span> <span data-up-from-dollars>{numberWithCommas(monthlyPayment)}</span>
							<span className="uplift-period__message">For a 12 month period</span>
						</div>
					</div>
					<div className="c-trip-detail-calendar__outer-button booking-standard booking-buttons-processed prop-not-fab">
						<span className="c-trip-detail-calendar-booking__details-accomodation-button disabled">
							<i />
							<span>Book trip</span>
						</span>
					</div>
				</div>
				<div className="uplift-full-message uplift-is-loaded">
					Can't pay in full today? You can book your trip with
					<strong>
						<strong>$200</strong> deposit
					</strong>{' '}
					or choose to <span className="uplift-link">pay in installments</span> with
					<span className="uplift-link"> UpLift</span> financing
				</div>
			</div>

			<div className="c-trip-detail-calendar__request-more-info">
				<span>HAVING </span>
				<span className="questions-about-trip">QUESTIONS ABOUT THIS TRIP? </span>
				OUR TRAVEL SPECIALIST CAN HELP!
				<span className="get-a-quote__request-more-info">
					<span> REQUEST MORE INFO</span>
				</span>
			</div>
		</div>
	);
};

export default BookingDetails;
