import React from "react";
import { Header, Segment, Icon, Input } from "semantic-ui-react";

const MessagesHeader = ({ searchLoading, handleSearchChange, channelName, numUniqueUsers }) => {
	return (
		<Segment clearing>
			{/* Channel Title */}
			<Header fluid="true" as="h2" floated="left" style={{ marginBottom: 0 }}>
				<span>
					{channelName}
					<Icon name="star outline" color="black" />
				</span>
				<Header.Subheader>{numUniqueUsers}</Header.Subheader>
			</Header>

			{/* Channel search input */}
			<Header floated="right">
				<Input
					loading={searchLoading}
					onChange={handleSearchChange}
					size="mini"
					icon="search"
					name="searchTerm"
					placeholder="Search Messages"
				/>
			</Header>
		</Segment>
	);
};

export default MessagesHeader;
