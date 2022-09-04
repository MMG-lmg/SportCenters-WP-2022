package util;

import beans.Membership;
import beans.MembershipStatus;
import service.MembershipService;

import java.time.LocalDate;
import java.util.TimerTask;

public class MembershipChecker extends TimerTask{

	@Override
	public void run() {
		MembershipService service = new MembershipService();
		for(Membership membership : service.getActive()) {
			if(membership.getValidDue().isBefore(LocalDate.now())) {
				membership.setStatus(MembershipStatus.INACTIVE);
				service.update(membership.getMembershipId(), membership);
			}
		}
	}


}
