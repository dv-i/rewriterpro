import React, { useEffect } from "react";
function Terms(): JSX.Element {
	useEffect(() => {
		document.title = "Terms of Service - RewriterPro.ai";
	}, []);
	return (
		<div className="mx-auto max-w-5xl p-5 privacypolicycontent">
			<h1 className="lg:max-w-2xl mx-auto text-4xl font-bold tracking-tight text-gray-900 sm:text-4xl text-center">
				Terms of Service
			</h1>
			<div className="custom_divider"></div>

			<p>
				<strong>Effective Date:</strong> [26/08/2023]
			</p>
			<p>
				These Terms of Service (&quot;Terms&quot;) govern your use of
				the RewriterPro.ai website and services (collectively referred
				to as the &quot;Service&quot;), operated by [KamranAli Limited]
				(&quot;we,&quot; &quot;us&quot;, or the &quot;Service&quot;),
				operated by [KamranAli Limited] (&quot;we,&quot; us,&quot; or
				&quot;our&quot;). By accessing or using the Service, you agree
				to comply with these Terms. If you do not agree with these
				Terms, please do not use the Service.
			</p>
			<h2>1. Acceptance of Terms</h2>

			<p>
				By accessing or using the Service, you acknowledge that you have
				read, understood, and agree to be bound by these Terms. If you
				are using the Service on behalf of an organization, you
				represent and warrant that you have the authority to bind that
				organization to these Terms.
			</p>

			<h2>2. Use of the Service</h2>

			<h3>2.1 Eligibility</h3>

			<p>
				You must be at least 18 years old to use the Service. By using
				the Service, you represent and warrant that you are at least 18
				years old.
			</p>

			<h3>2.2 Account Creation</h3>

			<p>
				You can create an account on RewriterPro.ai by signing up with
				your Google account or email. You are responsible for
				maintaining the confidentiality of your account credentials and
				for all activities that occur under your account.
			</p>

			<h3>2.3 Subscription</h3>

			<p>
				<strong>2.3.1 Fair Use Policy:</strong> While RewriterPro.ai
				offers unlimited usage, we operate under a fair use policy. We
				reserve the right to monitor and take action against any usage
				that violates this policy.
			</p>

			<p>
				<strong>2.3.2 Payment:</strong> You can subscribe to the Service
				on a monthly or yearly basis. Payment is processed through
				Stripe using debit or credit cards. By subscribing, you
				authorize us to charge the applicable subscription fees to your
				chosen payment method.
			</p>

			<p>
				<strong>2.3.3 Automatic Renewal:</strong> Subscriptions
				automatically renew unless cancelled by you. You can cancel your
				subscription at any time in your profile settings.
			</p>

			<p>
				<strong>2.3.4 Refunds:</strong> We do not offer refunds except
				in cases of accidental double charges or technical errors.
				Refund requests should be directed to our support team at
				support@rewriterpro.ai.
			</p>

			<h3>2.4 User Conduct</h3>

			<p>
				You agree to use the Service in compliance with all applicable
				laws and regulations. You shall not engage in any activity that
				interferes with or disrupts the Service, its servers, or
				networks.
			</p>

			<h2>3. Privacy</h2>

			<p>
				Your use of the Service is also governed by our Privacy Policy,
				which can be found at{" "}
				<a href="/privacy">https://rewriterpro.ai/privacy</a>.
			</p>

			<h2>5. Changes to Terms</h2>

			<p>
				We reserve the right to modify these Terms at any time. Changes
				will be effective immediately upon posting to the Service. Your
				continued use of the Service after the posting of any changes
				constitutes your acceptance of the updated Terms.
			</p>

			<h2>6. Governing Law and Dispute Resolution</h2>

			<p>
				These Terms shall be governed by and construed in accordance
				with the laws of England and Wales. Any disputes arising out of
				or in connection with these Terms or your use of the Service
				shall be subject to the exclusive jurisdiction of the courts of
				England and Wales.
			</p>

			<p>
				In the event of any dispute or claim arising from or relating to
				these Terms or your use of the Service, we encourage you to
				first attempt to resolve the matter by contacting us at{" "}
				<a href="mailto:support@rewriterpro.ai">
					support@rewriterpro.ai
				</a>
				. We will make reasonable efforts to resolve the issue in a
				timely and fair manner. If the matter remains unresolved after
				such efforts, you agree that any legal action or proceeding
				shall be brought exclusively in the courts of England and Wales.
			</p>

			<h2>Contact Information</h2>

			<p>
				For any inquiries or concerns regarding these Terms or the
				Service, you can contact us through our contact page at{" "}
				<a href="https://rewriterpro.ai/contact">
					https://rewriterpro.ai/contact
				</a>
			</p>
		</div>
	);
}

export default Terms;
