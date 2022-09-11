package util;

import beans.Membership;
import beans.MembershipStatus;
import service.CustomerService;
import service.MembershipService;

import java.time.LocalDate;
import java.util.TimerTask;

public class MembershipChecker extends TimerTask{

	@Override
	public void run() {
		MembershipService membershipService = new MembershipService();
		for(Membership membership : membershipService.getActive()) {
			if(membership.getValidDue().isBefore(LocalDate.now())) {
				membershipService.terminateExistingMembership(membership);
			}
		}
	}


}
